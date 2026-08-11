/* ==========================================================================
   captacao.js — validação, payload e envio da aplicação da Mentoria MMM.
   --------------------------------------------------------------------------
   POR QUE A VALIDAÇÃO É EM JS, E NÃO NATIVA
   A v1 desta página (protótipo do Claude Design) marcava os campos como
   `required` no template e o runtime DESCARTAVA o atributo ao renderizar:
   no DOM publicado `hasAttribute('required')` era `false` nos quatro campos e
   `form.checkValidity()` passava com tudo vazio. O formulário aqui usa
   `novalidate` + validação própria porque é a única que a gente controla —
   é também o que `padrao-ativos-web.md` manda.

   TRATAMENTO DE ERRO É DECISÃO DE NEGÓCIO
   Aqui o cadastro **é** a conversão (não antecede pagamento), então falha do
   POST **aparece** para a pessoa e o botão volta. Falhar em silêncio perderia
   o lead sem ninguém saber — exatamente o que estamos consertando.
   ========================================================================== */

(function () {
  'use strict';

  /* Porta de entrada: Core | Lead | Webhook no bn8n (a instância que operamos).
     ⚠️ NÃO é `automacao.bagents.cloud`, onde vivem os webhooks antigos do DNA
     Financeiro. Publicar num host e apontar a página para o outro dá 404 em
     produção. */
  var WEBHOOK = 'https://bn8n.bagents.cloud/webhook/lead';

  var form = document.getElementById('form-aplicacao');
  if (!form) return;

  var botao = document.getElementById('botao-enviar');
  var avisoErro = document.getElementById('aviso-erro');
  var rotuloBotao = botao.textContent;

  /* ---------- validação ---------- */

  function marcarErro(idCampo, mensagem) {
    var campo = document.getElementById('campo-' + idCampo);
    var alvo = document.getElementById(idCampo);
    var caixaErro = document.getElementById('erro-' + idCampo);
    campo.classList.add('campo--invalido');
    if (caixaErro) caixaErro.textContent = mensagem;
    alvo.setAttribute('aria-invalid', 'true');
  }

  function limparErro(idCampo) {
    var campo = document.getElementById('campo-' + idCampo);
    var alvo = document.getElementById(idCampo);
    var caixaErro = document.getElementById('erro-' + idCampo);
    campo.classList.remove('campo--invalido');
    if (caixaErro) caixaErro.textContent = '';
    alvo.removeAttribute('aria-invalid');
  }

  function soDigitos(valor) { return (valor || '').replace(/\D/g, ''); }

  /* Normaliza para DDD + número, sem o 55. Quem cola o número internacional e
     quem digita só o DDD precisam virar a MESMA string — senão a planilha fica
     com metade das linhas com 55 na frente e "procurar pelo telefone" não acha. */
  function telefoneNormalizado(valor) {
    var d = soDigitos(valor);
    if (d.indexOf('55') === 0 && (d.length === 12 || d.length === 13)) d = d.slice(2);
    return d;
  }

  /* 10 dígitos (fixo com DDD) ou 11 (celular com o 9). Aceita o 55 na frente e
     desconta, porque muita gente cola o número internacional. */
  function telefoneValido(valor) {
    var d = soDigitos(valor);
    if (d.length === 13 && d.indexOf('55') === 0) d = d.slice(2);
    if (d.length === 12 && d.indexOf('55') === 0) d = d.slice(2);
    if (d.length !== 10 && d.length !== 11) return false;
    var ddd = parseInt(d.slice(0, 2), 10);
    if (ddd < 11 || ddd > 99) return false;                 /* não existe DDD < 11 */
    if (d.length === 11 && d.charAt(2) !== '9') return false; /* celular começa com 9 */
    return true;
  }

  /* Formato, não existência: quem valida de verdade é o servidor. Isto é UX. */
  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test((valor || '').trim());
  }

  function validar() {
    var erros = [];
    var v = function (id) { return (document.getElementById(id).value || '').trim(); };

    ['nome', 'email', 'whatsapp', 'especialidade', 'faturamento', 'consentimento']
      .forEach(limparErro);

    if (v('nome').length < 3) {
      marcarErro('nome', 'Informe o seu nome completo.'); erros.push('nome');
    }
    if (!emailValido(v('email'))) {
      marcarErro('email', 'Confira o e-mail: parece estar incompleto.'); erros.push('email');
    }
    if (!v('whatsapp')) {
      marcarErro('whatsapp', 'O WhatsApp é obrigatório — é por ele que a equipe responde.');
      erros.push('whatsapp');
    } else if (!telefoneValido(v('whatsapp'))) {
      marcarErro('whatsapp', 'Informe DDD + número (10 ou 11 dígitos).'); erros.push('whatsapp');
    }
    if (v('especialidade').length < 3) {
      marcarErro('especialidade', 'Informe a sua especialidade.'); erros.push('especialidade');
    }
    if (!v('faturamento')) {
      marcarErro('faturamento', 'Selecione uma faixa de faturamento.'); erros.push('faturamento');
    }
    if (!document.getElementById('consentimento').checked) {
      marcarErro('consentimento', 'Precisamos da sua autorização para avaliar a aplicação.');
      erros.push('consentimento');
    }
    return erros;
  }

  /* Limpa o erro do campo assim que a pessoa corrige — erro que fica na tela
     depois de resolvido faz a pessoa achar que ainda está errado. */
  ['nome', 'email', 'whatsapp', 'especialidade', 'faturamento', 'consentimento']
    .forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('input', function () { limparErro(id); });
      el.addEventListener('change', function () { limparErro(id); });
    });

  /* ---------- envio ---------- */

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    avisoErro.hidden = true;

    var erros = validar();
    if (erros.length) {
      var primeiro = document.getElementById(erros[0]);
      primeiro.focus();
      primeiro.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    var attr = window.pzAtribuicao ? window.pzAtribuicao() : null;
    var utms = window.pzAtribuicaoPlana ? window.pzAtribuicaoPlana(attr) : {};

    /* Contrato compartilhado com a plataforma (padrao-ativos-web.md §Captação).
       Campo que não se aplica vai '' em vez de sumir, para não quebrar o fluxo
       n8n a jusante. */
    var payload = {
      tenant_slug: 'daniele-meger',
      ativo_slug: 'lp-mentoria-mmm',
      formulario: 'mentoria-mmm',
      origem: 'lp-mentoria-mmm',
      cta: 'completar-aplicacao',
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim().toLowerCase(),
      whatsapp: telefoneNormalizado(document.getElementById('whatsapp').value),
      consentimento: document.getElementById('consentimento').checked,
      /* O texto EXIBIDO vai literal: é o que prova o que a pessoa leu.
         Reescrever o consentimento exige versionar, não editar por cima. */
      consent_texto: (document.getElementById('texto-consentimento').textContent || '')
        .replace(/\s+/g, ' ').trim(),
      empresa_site: document.getElementById('empresa_site').value,
      spam_score: 0,
      custom: {
        especialidade: document.getElementById('especialidade').value.trim(),
        faturamento: document.getElementById('faturamento').value,
        instagram: document.getElementById('instagram').value.trim()
      },
      attr: attr,
      utm_source: utms.utm_source || '',
      utm_medium: utms.utm_medium || '',
      utm_campaign: utms.utm_campaign || '',
      utm_content: utms.utm_content || '',
      utm_term: utms.utm_term || '',
      referrer: utms.referrer || '',
      /* Deduplicação: reenvio por dedo nervoso não vira dois leads, e a mesma
         conversão chegando por browser + CAPI conta uma vez. */
      event_id: (window.crypto && window.crypto.randomUUID)
        ? window.crypto.randomUUID()
        : 'e-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
    };

    /* Honeypot preenchido: finge que deu certo e não envia. Nunca avisar o bot. */
    if (payload.empresa_site.trim() !== '') {
      window.location.href = 'obrigado.html';
      return;
    }

    /* ── CÓPIA DE VALIDAÇÃO · TRECHO GERADO ────────────────────────────────
       No repo do cliente aqui vai um POST real para o n8n. Nesta cópia o envio
       está DESLIGADO de propósito: os fluxos de captação ainda não foram
       ativados e o endpoint devolve 404, e um erro vermelho numa página que
       existe para aprovar layout lê como defeito de quem fez.
       A validação em JS acima continua inteira — os campos criticam igual.
       Corrigir na origem e republicar; não editar aqui. */
    avisoErro.hidden = false;
    avisoErro.className = 'aviso-envio aviso-envio--validacao';
    avisoErro.textContent = 'Esta é uma prévia para aprovação de layout e texto. '
      + 'O envio ainda não está ligado, então nada foi registrado.';
    if (window.console) console.info('[MMM] prévia de validação: envio desligado.', payload);
  });

  /* Revelação por scroll agora mora em `revela.js` (2026-08-06), compartilhado
     com a `dna-financeiro` — com cascata de atraso entre irmãos e gatilho
     mais cedo, no lugar da versão simples que vivia aqui. */
})();
