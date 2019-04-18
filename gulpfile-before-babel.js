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
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs'); // Node File Systen, required to get JSON data to update
var yaml = require('gulp-yaml');
var jsYAML = require('js-yaml');
var touch = require('gulp-touch-fd');


// Development Tasks
// -----------------

//Setting up BrowerSync to work with MAMP
function browser_sync() {
    browserSync.init({
        open: 'external',
        host: 'design2019-dev', //virtual host defined in etc/hosts/ and httpd-vhosts.conf
        proxy: 'design2019-dev' //virtual host defined in etc/hosts/ and httpd-vhosts.conf
        // port: 8080 //new port for browsersync
    });
};

function css() {
    return gulp.src('dev/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', sass.logError) // Convert Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dev/assets/css'))
    .pipe(browserSync.stream()); //inject CSS updates into browser
    
};

// gulp.task('yaml', function() { // Convert YAML to JSON
//     return gulp.src('dev/content/**/*.+(yaml|yml)')
//     .pipe(yaml({ space: 2 }))
//     .pipe(gulp.dest('dev'))
// });

// gulp.task('nunjucks', function(){ // Compile pages using data from a JSON source
//     var dataFile = './dev/test.json';
//     return gulp.src('dev/pages/**/*.+(html|njk)') // Gets .html and .njk files in pages
//     .pipe(data(function() { // Adding data to Nunjucks
//         return JSON.parse(fs.readFileSync(dataFile));
//       }))
//     .pipe(nunjucksRender({ // Renders template with nunjucks
//       path: ['dev/templates']
//     }))
//     .pipe(gulp.dest('dev')) // output files in dev folder
//     .pipe(touch()); // Solves an issue where some changes in templates would not show up
// });

function nunjucks() { // Compile pages using data from a YAML source
    var dataFile = './dev/data.yaml';
    return gulp.src('dev/pages/**/*.+(html|njk)') // Gets .html and .njk files in pages
    .pipe(data(function() { // Adding data to Nunjucks
        return jsYAML.safeLoad(fs.readFileSync(dataFile));
      }))
    .pipe(nunjucksRender({ // Renders template with nunjucks
      path: ['dev/templates']
    }))
    .pipe(gulp.dest('dev')) // output files in dev folder
    .pipe(touch()); // Solves an issue where some changes in templates would not show up
};

// function reload(done) {
//     browserSync.reload();
//     done();
//   }

function reload(done){
    browserSync.reload();
    done();
};  

//Watch files for changes
function watch_files() {
    gulp.watch('dev/assets/sass/**/*.scss', gulp.series(css));
    gulp.watch('dev/**/*.+(njk|yaml|yml)', gulp.series(nunjucks));
    // gulp.watch('dev/content/**/*.+(yaml|yml)', gulp.series('yaml'));
    // gulp.watch('dev/**/*.json', gulp.series('nunjucks'));
    // gulp.watch('dev/**/*.+(yaml|yml)', gulp.series('nunjucks', 'reload'));
    // gulp.watch('dev/**/*.+(html|json|yaml|njk)', gulp.series(reload)); //reload browser when HTML or JSON files are updated
    gulp.watch('dev/**/*.html', gulp.series(reload)); // reload browser once Nunjucks has compiled the html pages
    gulp.watch('dev/assets/js/**/*.js', gulp.series(reload)); //reload browser when JS files are saved
};



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
// gulp.task('default', function(callback) {
//     runSequence(['sass', 'nunjucks', 'browserSync'], 'watch',
//       callback
//     )
// });

gulp.task('default', 
    gulp.series(css, nunjucks, gulp.parallel(browser_sync, watch_files))
);


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