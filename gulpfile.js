// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
//var sass = require('gulp-ruby-sass');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify-es').default;
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var del = require('del');
var runSequence = require('run-sequence');


// Development Tasks
// -----------------

//Setting up BrowerSync to work with MAMP
gulp.task('browserSync', function() {
    browserSync.init({
        open: 'external',
        host: 'design2018-dev', //virtual host defined in etc/hosts/ and httpd-vhosts.conf
        proxy: 'design2018-dev' //virtual host defined in etc/hosts/ and httpd-vhosts.conf
        // port: 8080 //new port for browsersync
        
    });
});

gulp.task('sass', function(){
    return gulp.src('dev/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', sass.logError) // Convert Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dev/assets/css'))
    .pipe(browserSync.stream()); //inject CSS updates into browser
});

//Watch files for changes
gulp.task('watch', function(){
    gulp.watch('dev/assets/sass/**/*.scss', ['sass']);
    gulp.watch('dev/**/*.php', browserSync.reload); //reload browser when PHP files are saved
    gulp.watch('dev/assets/js/**/*.js', browserSync.reload); //reload browser when JS files are saved
    // Other watchers: js, etc
});


// Build Tasks
// -------------------

//Concat and minify JS and CSS, send PHP, JS, and CSS to Dist
gulp.task('useref', function(){
    return gulp.src('dev/**/*.php')
    .pipe(useref()) // Look for "build js" comments and then concat scripts
    .pipe(gulpIf('*.js', uglify())) // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.css', cssnano())) // Minifies only if it's a CSS file
    .on('error', function (err) { log.error('[Error]', err.toString()); }) // This has been updated to fancy-log. Check that it's working.  
    .pipe(gulp.dest('dist'))
});

//Optimize Images - Lossless
gulp.task('images', function(){
    return gulp.src('dev/assets/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img'))
});

//Copy .htaccess so URLs work right
gulp.task('htaccess', function() {
    return gulp.src('dev/.htaccess')
    .pipe(gulp.dest('dist/'))
  })

//Cleaning
gulp.task('clean:dist', function() {
    return del.sync('dist');
});


// Build Sequences
// ---------------

//Default watch for changes
gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync'], 'watch',
      callback
    )
});


//Optimize and build the site
gulp.task('build', function(callback) {
    runSequence(
      'clean:dist',
      'sass',
      ['useref', 'images', 'htaccess'],
      callback
    )
});


// // Default Task
// gulp.task('default', ['sass', /*'scripts',*/ 'watch']);