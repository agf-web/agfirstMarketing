// CONFIG ________________________________________
var siteUrl = __dirname.split('/pub/')[0].split('/').pop() + '.test'; // use '.test' or .sandbox. I like '.test'

// REQUIRES ________________________________________
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var sass            = require('gulp-sass');
// var compass         = require('compass-importer');
var bourbon         = require('bourbon').includePaths;
var autoprefixer    = require('gulp-autoprefixer');
var sourcemaps      = require('gulp-sourcemaps');
var imagemin        = require('gulp-imagemin');

var config = {
  // config obj for SASS compilation --------------------------------------------------------------
  sass: {
    outputStyle: 'compressed',
    includePaths: [
      bourbon,
      'node_modules/'
    ]
    //importer: compass
  },
  // custom function for SASS errors (used in task 'sass')
  sassError: function(error) {
    sass.logError.bind(this)(error);
  },
  // autoprefixer config ----------------------------------------------------------------
  autoprefixer: [
    'last 2 version',
    // 'safari 5',
    // 'ie 7',
    // 'ie 8',
    // 'ie 9',
    // 'opera 12.1',
    // 'ios 6',
    // 'android 4'
  ]
};



// ================================================================================================
// Tasks
// ================================================================================================


// compile sass and return stream
gulp.task('scss', () =>
gulp.src('scss/styles.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass).on('error', config.sassError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
);

gulp.task('image_optimize', () =>
gulp.src('img/**/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('img'))
);

// ==================================================
// MAIN TASKS
// ==================================================
gulp.task('default', function () {
  gulp.start('image_optimize');
  gulp.watch('scss/**/*.scss', ['scss']);
  gulp.watch('img-unoptimized/**/*', ['image_optimize']);
});
