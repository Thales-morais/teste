<?php
/**
 * SNIPPET PHP — Cole no functions.php do tema filho
 * OU instale o plugin "Code Snippets" e cole lá (mais seguro).
 *
 * Carrega os scripts apenas nas páginas corretas via slug.
 * Ajuste 'lp-guti' e 'obrigado' para os slugs reais das suas páginas no WordPress.
 */

add_action('wp_enqueue_scripts', function () {
    // Slug da sua LP com o formulário
    $lp_slug = 'lp-guti';

    // Slug da sua página de obrigado
    $obrigado_slug = 'obrigado';

    if (is_page($lp_slug)) {
        wp_enqueue_script(
            'guti-utm-capture',
            get_stylesheet_directory_uri() . '/utm-redirect/lp-capture-utm.js',
            [], // sem dependências
            '1.0.0',
            true // carrega no footer (antes de </body>)
        );
    }

    if (is_page($obrigado_slug)) {
        wp_enqueue_script(
            'guti-obrigado-whatsapp',
            get_stylesheet_directory_uri() . '/utm-redirect/obrigado-whatsapp.js',
            [],
            '1.0.0',
            true
        );
    }
});
