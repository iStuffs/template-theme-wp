# Template theme for wordpress

Here is a template for wordpress integrator who wants to work with sass and gulp.

## Features

-   The gulp file minifies the sass, js and reloads when css, js, php is edited.
-   the `src/` directory is the location where your sass and integration html is settle.(it uses my default [front-end starter kit](https://github.com/iStuffs/starter-kit) stucture).
-   the wordpress theme implements a header and a footer include (with `wp_head()` and `wp_footer()`).
-   the wordpress theme uses the `<base>` tag to set relative links.

## Files structure

```
template-theme-wp/
├── css/
│   └── *.min.css
├── js/
│   └── *.min.js
├── src/ <- your working directory
│   ├── js/
│   │   └── *.js
│   ├── sass/
│   │   ├── _*.sass|scss
│   │   └── style.sass
│   └── index.html
├── footer.php
├── header.php
├── index.php
├── screenshot.jpg
└── style.css
```
