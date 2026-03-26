/**
 * SCRIPT 1 — Página do formulário (LP)
 * Onde adicionar: Elementor > Custom Code > Before </body> (somente na página do formulário)
 * OU via Code Snippets plugin com wp_enqueue_scripts condicional.
 *
 * O que faz:
 *  - Lê utm_campaign da URL
 *  - Salva no sessionStorage para usar na página de obrigado
 *  - Também tenta injetar a UTM na URL de redirect do Elementor Pro Form
 */
(function () {
  var utm = new URLSearchParams(window.location.search).get('utm_campaign');
  if (!utm) return;

  // Persiste para a próxima página (sessionStorage sobrevive a redirects na mesma aba)
  sessionStorage.setItem('guti_utm', utm);

  // --- Hook no Elementor Pro Form para passar UTM via URL ---
  // Tenta modificar a redirect_url antes do Elementor fazer o redirect
  window.addEventListener('load', function () {
    if (typeof jQuery === 'undefined') return;

    jQuery(document).on('elementor/forms/submit_success', function (event, response) {
      if (
        response &&
        response.data &&
        typeof response.data.redirect_url === 'string'
      ) {
        var url = response.data.redirect_url;
        var sep = url.indexOf('?') !== -1 ? '&' : '?';
        response.data.redirect_url = url + sep + 'utm_campaign=' + encodeURIComponent(utm);
      }
    });
  });
})();
