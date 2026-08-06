# LP Mentoria MMM — Daniele Meger (cópia publicada)

> **Cópia de leitura para o time de design.** Sem deploy: abre no navegador.
> **GERADO. Não editar nada aqui à mão.** Esta pasta é montada por
> `clientes/cliente-daniele-meger/2-motor-de-crescimento/vendas/lp-mentoria-mmm/publicar.mjs`
> a partir do repo do cliente (privado, sem remote). Correção se faz na origem
> e republica — editar aqui cria drift silencioso.

## O que é

A página de vendas da **Mentoria Mente Médica Milionária**, na identidade MEGER,
publicada em **modo validação**: existe para a Daniele aprovar layout, estrutura
e texto.

## O que esta cópia NÃO faz

🔴 **O formulário não envia.** No ativo de origem ele posta para o n8n; aqui o
envio está **desligado de propósito**, porque os fluxos de captação
(`Core | Lead | Webhook` e `Meger | Lead | MentoriaMMM`) foram escritos e
ainda não foram ativados — o endpoint devolve 404. Quem completar o formulário
vê um aviso dizendo isso, e **nada é registrado**.

A validação dos campos continua inteira: nome, e-mail, WhatsApp com 10–11
dígitos, especialidade, faixa de faturamento e consentimento criticam
normalmente. É o comportamento real da página, menos o POST.

## O que está propositalmente em branco na página

Não são erros — são as respostas que faltam, e aparecem visíveis para cobrar:

- **três lugares de depoimento reservados** — depoimento não se inventa;
- **o número de resultado**, marcado com `?` — não existe em fonte nenhuma, e
  número de lucro estimado numa página de consultoria financeira não é licença
  poética;
- **promessa, meta inicial, investimento, bônus/garantia e "por que agora"** —
  ausentes porque dependem de resposta da Daniele.


---

_Impressão da origem: `559bad9bc6dd04f9` · gerado em 2026-08-03T18:09:45.689Z_
