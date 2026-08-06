/* Revelação por scroll — extraído de dentro de `captacao.js` (2026-08-06) para
   o mesmo desenho já validado na `dna-financeiro`: IntersectionObserver COM
   FAILSAFE. Sem o failsafe, um observer que não dispara deixa a página em
   branco, porque os blocos nascem com `opacity: 0`. */
(function () {
  'use strict';

  var alvos = document.querySelectorAll('[data-revela]');
  if (!alvos.length) return;

  /* Cascata: cada elemento atrasa conforme a posição entre os IRMÃOS que
     também têm `[data-revela]` — não a posição na página inteira. É o que
     faz badge → título → texto → lista entrarem em sequência dentro de uma
     seção, e os cards de `.diagnostico`/`.numeros`/`.mecanismo`/`.etapa`
     entrarem um a um, sem que a seção seguinte herde o atraso da anterior
     (cada grupo de irmãos reinicia em 0). PASSO e TETO ficam pequenos de
     propósito: é ritmo, não espera — página densa é anti-padrão explícito
     desta marca (ver estilo.css). */
  var PASSO_MS = 90;
  var TETO_PASSOS = 5;
  Array.prototype.forEach.call(alvos, function (el) {
    var irmaos = Array.prototype.filter.call(el.parentElement.children, function (irmao) {
      return irmao.hasAttribute('data-revela');
    });
    var indice = Math.min(irmaos.indexOf(el), TETO_PASSOS);
    if (indice > 0) el.style.setProperty('--revela-atraso', (indice * PASSO_MS) + 'ms');
  });

  function revelar(el) { el.classList.add('dentro'); }

  /* A hero não tem scroll para revelar por definição: é a única seção que já
     nasce em tela. Ela revela imediatamente, sempre, mantendo só a cascata de
     atraso entre os irmãos — sem depender do mesmo gatilho de rolagem do
     resto da página (que, em viewports baixos, poderia deixá-la esperando o
     failsafe de 3s). */
  var heroAlvos = document.querySelectorAll('.heroi [data-revela]');
  Array.prototype.forEach.call(heroAlvos, revelar);

  var scrollAlvos = Array.prototype.filter.call(alvos, function (el) {
    return !el.closest('.heroi');
  });
  if (!scrollAlvos.length) return;

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.prototype.forEach.call(scrollAlvos, revelar);
    return;
  }

  /* `-30%`, não `-10%`: o gatilho antigo disparava com o topo do elemento a
     só 90% da altura da tela, quase no instante em que a primeira fatia
     aparecia lá embaixo — com a duração mais longa da entrada, a revelação
     terminava de tocar enquanto o elemento ainda estava subindo pela tela, e
     quem rolava via o texto já parado, nunca o movimento. `-30%` empurra o
     gatilho para quando o elemento já cruzou bem mais para dentro do
     viewport. */
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { revelar(e.target); observador.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -30% 0px' });

  Array.prototype.forEach.call(scrollAlvos, function (el) { observador.observe(el); });
  setTimeout(function () { Array.prototype.forEach.call(scrollAlvos, revelar); }, 3000);
})();
