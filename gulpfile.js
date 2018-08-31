/* ---------------------------------------- */
/*           Nom de mon thème               */
/* ---------------------------------------- */
var urlTrailingPath    = "istuffs";
/* ---------------------------------------- */
/* Déclaration des variables pour les tasks */
/* ---------------------------------------- */
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    rename          = require('gulp-rename'),
    cleanCss        = require('gulp-clean-css'),
    htmlMin         = require('gulp-htmlmin'),
    uglify          = require('gulp-uglify'),
    browserSync     = require('browser-sync'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    babel           = require('gulp-babel'),
    plumber         = require('gulp-plumber'),
    notify          = require("gulp-notify"),
    gulpif          = require('gulp-if'),
    argv            = require('yargs').argv;


/* --------------------- */
/* Déclaration des tasks */
/* --------------------- */
gulp.task('sass-task', function () {
  return gulp.src('./src/sass/**/*.{scss,sass}')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(gulpif(!argv.production, sourcemaps.init()))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
      browsers: ['last 6 versions'],
      cascade: false
  }))
  .pipe(cleanCss({
    compatibility: 'ie8'
  }))
  .pipe(rename(function(path){ path.basename += ".min"; }))
  .pipe(gulpif(!argv.production, sourcemaps.write('.')))
  .pipe(gulp.dest('./css'));
});

gulp.task('js-task', function() {
  return gulp.src('./src/js/*.js')
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulpif(argv.production, uglify()))
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
