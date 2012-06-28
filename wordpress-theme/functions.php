<?
	if ( function_exists( 'add_theme_support' ) ) { 
		add_theme_support( 'post-thumbnails' ); 
	}
	
	if ( function_exists( 'add_theme_support' ) ) { // Added in 2.9
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 33, 33, true ); // Normal post thumbnails
		add_image_size( 'tooltip-thumbnail', 33, 33, true ); 
	}
?>