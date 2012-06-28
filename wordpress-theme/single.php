<?php
	if (have_posts()) {
		while (have_posts()) {
			the_post();
			
			$name = basename(get_permalink());
			
			$profession = get_field('profession');
			$recharge = get_field('recharge');
			$skillPointCost = get_field('skill-point-cost');
			$slot = get_field('slot');
			$skillTier = get_field('skill-tier');
			
			$images = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'tooltip-thumbnail' );
			$imageURL = $images[0];
			
			$data = array(
				'nicename'			=> get_the_title(),
				'profession' 		=> $profession, 
				'recharge' 			=> $recharge, 
				'skillPointCost' 	=> $skillPointCost, 
				'image' 			=> $imageURL,
				'slot' 				=> $slot,
				'skillTier' 		=> $skillTier,
				'description'		=> get_the_content()
			);
			
			$arr = array('name' => $name, 'data' => $data);
			
			$json = json_encode($arr);
			echo "gw2tipJSONP(". $json . ");";

		}
	};
?>