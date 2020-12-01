<?php 
/*
 * Подключение стилей и скриптов
 * */

function my_assets()
{

  // Пути к стандартным файлам страницы
  $page_template =  mb_substr(get_page_template_slug(), 0, -4);
  $css_file_path = get_template_directory_uri() . '/build/css/pages/' . $page_template . '.css';
  $css_file_path_desk = get_template_directory_uri() . '/build/css/pages/' . $page_template . '-desktop.css';
  $js_file_path = get_template_directory_uri() . '/build/js/pages/' . $page_template . '.js';

  wp_deregister_script('jquery-core');
  wp_register_script('jquery-core', get_stylesheet_directory_uri() . '/libs/jquery-3.5.0.min.js');
  wp_enqueue_script('jquery');

  // Глобальные стили
  wp_enqueue_style('main-style', get_template_directory_uri() . '/build/css/main.css');
  wp_enqueue_style('main-style-desktop', get_template_directory_uri() . '/build/css/main-desktop.css');

  // Шрифты 
  wp_enqueue_style('font-1', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,700&display=swap');

  // Полифилы
  wp_enqueue_script('focus-visible', get_stylesheet_directory_uri() .'/libs/focus-visible.min.js',  array('jquery'), '1.0', true);
  wp_enqueue_script('ofi', get_stylesheet_directory_uri() .'/libs/ofi.min.js',  array('jquery'), '1.0', true);
  wp_enqueue_script('modernizr', get_stylesheet_directory_uri() .'/libs/modernizr.js',  array('jquery'), '1.0', true);
  
  // Плагины
  wp_enqueue_script('underscore', get_stylesheet_directory_uri() . '/libs/underscore.js',  array('jquery'), '1.0', true);
  wp_enqueue_script('gsap-js', get_stylesheet_directory_uri() . '/libs/gsap.min.js' ,  array('jquery'), '1.0', true);
  // wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js',  array('jquery'), '1.0', true);
  // wp_enqueue_script('smooth-scroll', get_stylesheet_directory_uri() . '/build/js/libs/SmoothScroll.min.js',  array('jquery'), '1.0', true);
  // wp_enqueue_script('lax', get_stylesheet_directory_uri() . '/build/js/libs/lax.min.js',  array('jquery'), '1.0', true);
  // wp_enqueue_script('scroll-magic', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',  array('jquery'), '1.0', true); 
  // wp_enqueue_script('scroll-magic-animation', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js',  array('jquery'), '1.0', true);
  // wp_enqueue_script('scroll-magic-debug', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js',  array('jquery'), '1.0', true);

  // Глобальные js
  wp_enqueue_script('global-js', get_stylesheet_directory_uri() . '/build/js/modules/_partials/global.js',  array('jquery'), '1.0', true);
  wp_enqueue_script('ClassScrollBlocker', get_stylesheet_directory_uri() . '/build/js/modules/_partials/ClassScrollBlocker.js',  array('jquery'), '1.0', true);
  wp_enqueue_script('ClassPopup', get_stylesheet_directory_uri() . '/build/js/modules/_partials/ClassPopup.js',  array('jquery'), '1.0', true);
  
  wp_enqueue_script('main-js', get_stylesheet_directory_uri() . '/build/js/main.js',  array('jquery'), '1.0', true);
  
  // Модули
  wp_enqueue_script('header', get_stylesheet_directory_uri() . '/build/js/modules/header/header.js',  array('jquery'), '1.0', true);
  wp_enqueue_script('popup-js', get_stylesheet_directory_uri() . '/build/js/modules/popup/popup.js',  array('jquery'), '1.0', true);
  
  // js и css к обычным страницам
  $is_singular = is_singular('cough');
  if (!$is_singular && !is_404() && !is_search(  )) {
    wp_enqueue_style( $page_template, $css_file_path );
    wp_enqueue_style( $page_template.'-desk', $css_file_path_desk );
    wp_enqueue_script($page_template.'-js', $js_file_path,  array('jquery'), '1.0', true);
  }

  // js и css к сингулярам
  if(is_singular('cough')) {
    // wp_enqueue_style( 'cough', get_template_directory_uri().'/build/css/pages/page-template.css' );
    // wp_enqueue_style( 'cough-desctop', get_template_directory_uri().'/build/css/pages/page-template-desktop.css' );
  }

  // js и css к странице 404
  if(is_404()) {
    // wp_enqueue_style( 'cough', get_template_directory_uri().'/build/css/pages/page-template.css' );
    // wp_enqueue_style( 'cough-desctop', get_template_directory_uri().'/build/css/pages/page-template-desktop.css' );
    // wp_enqueue_style( 'page-404', get_template_directory_uri().'/build/css/pages/404.css' );
  }  
}

add_action('wp_enqueue_scripts', 'my_assets');