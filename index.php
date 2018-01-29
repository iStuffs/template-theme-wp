<?php get_header(); ?>
<!-- your content here -->

<!-- exemple loop -->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
