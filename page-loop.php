<?php get_header(); ?>

<!-- loop exemple with args -->
        <?php
          $args = array('post_type' => 'my-custom-post-type', 'posts_per_page' => 6 );
          $loop = new WP_Query( $args );
          while ( $loop->have_posts() ) : $loop->the_post();
        ?>

        <?php endwhile; ?>

<?php get_footer(); ?>
