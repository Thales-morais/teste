/**
 * SCRIPT 2 — Página de Obrigado
 * Onde adicionar: Elementor > Custom Code > Before </body> (somente na página de obrigado)
 * OU via Code Snippets plugin com wp_enqueue_scripts condicional.
 *
 * O que faz:
 *  - Lê utm_campaign (primeiro da URL, depois do sessionStorage como fallback)
 *  - Troca o href de todos os botões/links do WhatsApp pelo link correto do grupo
 *
 * ATENÇÃO: O botão do WhatsApp no Elementor precisa ter o link padrão com "whatsapp.com"
 * OU ter a classe CSS "btn-whatsapp" para ser detectado corretamente.
 */
(function () {
  // =====================================================================
  // MAPEAMENTO: utm_campaign => link do grupo WhatsApp
  // Duplicata de ID 393 encontrada na planilha — mantido o primeiro registro.
  // Atualize este objeto sempre que adicionar novos grupos.
  // =====================================================================
  var UTM_MAP = {
    '176':  'https://chat.whatsapp.com/DYqGXW0KjAu0UcIp78y8wC',
    '247':  'https://chat.whatsapp.com/IsNccNO2ImUFXUfp4d1WeM',
    '395':  'https://chat.whatsapp.com/JYdB6UBf0bGKywBmxxp0CR',
    '393':  'https://chat.whatsapp.com/CNL6bpYtxzkE8GnIEkVuxS',
    '279':  'https://chat.whatsapp.com/LGbNyayxLHh1kOL5M8HPKa',
    '185':  'https://chat.whatsapp.com/DIxXP8yAGk2FECLDHjpRcb',
    '394':  'https://chat.whatsapp.com/CccIC8IBY51CSi6QciykWf',
    '279A': 'https://chat.whatsapp.com/LcNHtW2cU681ZOLI3psWBa',
    '176A': 'https://chat.whatsapp.com/HQ9I3VFueAFC99rPehQYQt',
    '394A': 'https://chat.whatsapp.com/H8LMFp75xrL6akxCrXh55j',
  };

  // Link de fallback caso a UTM não seja reconhecida
  var FALLBACK_LINK = 'https://chat.whatsapp.com/DYqGXW0KjAu0UcIp78y8wC';

  // Lê UTM: prioridade para ?utm_campaign= na URL, depois sessionStorage
  var params = new URLSearchParams(window.location.search);
  var utm = params.get('utm_campaign') || sessionStorage.getItem('guti_utm');

  var whatsappLink = (utm && UTM_MAP[utm]) ? UTM_MAP[utm] : FALLBACK_LINK;

  function applyLink() {
    // Seleciona links que apontam para whatsapp.com/chat
    var byHref = document.querySelectorAll('a[href*="chat.whatsapp.com"], a[href*="wa.me"]');
    byHref.forEach(function (el) { el.href = whatsappLink; });

    // Seleciona por classe CSS customizada (opcional — adicione no Elementor se quiser)
    var byClass = document.querySelectorAll('.btn-whatsapp, [data-wpp-redirect]');
    byClass.forEach(function (el) { el.href = whatsappLink; });
  }

  // Executa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLink);
  } else {
    applyLink();
  }
})();
