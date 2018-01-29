/* ---------------------------------------- */
/*           Nom de mon thème               */
/* ---------------------------------------- */
var urlTrailingPath    = "istuffs";
/* ---------------------------------------- */
/* Déclaration des variables pour les tasks */
/* ---------------------------------------- */
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var rename          = require('gulp-rename');
var cleanCss        = require('gulp-clean-css');
var htmlMin         = require('gulp-htmlmin');
var uglify          = require('gulp-uglify');
var browserSync     = require('browser-sync');
var sourcemaps      = require('gulp-sourcemaps');
var imagemin        = require('gulp-imagemin');
var babel           = require('gulp-babel');
var plumber         = require('gulp-plumber');
var notify          = require("gulp-notify");

/* --------------------- */
/* Déclaration des tasks */
/* --------------------- */
gulp.task('sass-task', function () {
  return gulp.src('./src/sass/**/*.{scss,sass}')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 6 versions'],
      cascade: false
  }))
  .pipe(cleanCss({
    compatibility: 'ie8'
  }))
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./css'));
});

gulp.task('js-task', function() {
  return gulp.src('./src/js/*.js')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(uglify())
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(gulp.dest('./js'));
});


gulp.task('refresh', function() {
	var files = [
			'./*.php',
			'./css/*.css',
			'./js/*.js',
			'./img/*.{png,jpg,gif,svg}'
		    ];
	browserSync.init(files, {
		proxy: "localhost/" + urlTrailingPath,
		injectChanges: true
	});
});


/* ------------------- */
/* Exécution des tasks */
/* ------------------- */
gulp.task('watch', ['sass-task', 'js-task', 'refresh'], function () {
  gulp.watch('./src/sass/**/*.{scss,sass}', ['sass-task']);
  gulp.watch('./src/js/*.js', ['js-task']);
  gulp.watch('./*.php').on('change', browserSync.reload);
  gulp.watch('./css/*.css').on('change', browserSync.reload);
  gulp.watch('./js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
