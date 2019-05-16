// Load Gulp
var gulp = require('gulp'); 

// CSS Plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// JS plugins
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


// Utility Plugins
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var log = require('fancy-log');
var del = require('del');

// Browsersync
var browserSync = require('browser-sync').create();


// Nunjucks plugins
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs'); // Node File Systen, required to get JSON data to update
var yaml = require('gulp-yaml');
var jsYAML = require('js-yaml');
var touch = require('gulp-touch-fd');

var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

// Project Variables
var jsSRC = 'dev/assets/js/';
var jsFront = 'main.js';
var jsLibrary = 'libs.js';
// var jsLibs = 'libs.js'
var jsLibs = [ jsLibrary ];
var jsFiles = [ jsFront ];
var jsURL = 'dev/assets/js';


// Development Tasks
// -----------------

//Setting up BrowerSync to work with MAMP
function browser_sync(done) {
    browserSync.init({
        open: 'external',
        host: 'design2019-dev', //virtual host defined in etc/hosts/ and httpd-vhosts.conf
        proxy: 'design2019-dev', //virtual host defined in etc/hosts/ and httpd-vhosts.conf
        // port: 8080 //new port for browsersync
        // Below allows moves Browsersync to head for Ajax loading
        snippetOptions: {
          rule: {
            match: /<\/head>/i,
            fn: function (snippet, match) {
              return snippet + match;
            }
          }
        }
    });
    
    done();
};

function css(){
    return gulp.src('dev/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', sass.logError) // Convert Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dev/assets/css'))
    .pipe(browserSync.stream()); //inject CSS updates into browser
    // .pipe(browserSync.reload({stream:true}));
};

function nunjucks(done){ // Compile pages using data from a YAML source
    var dataFile = './dev/data.yaml';
    return gulp.src('dev/pages/**/*.+(html|njk)') // Gets .html and .njk files in pages
    .pipe(data(function() { // Adding data to Nunjucks
        return jsYAML.safeLoad(fs.readFileSync(dataFile));
      }))
    .pipe(nunjucksRender({ // Renders template with nunjucks
      path: ['dev/templates']
    }))
    .pipe(gulp.dest('dev')) // output files in dev folder
    .pipe(touch()) // Solves an issue where some changes in templates would not show up
    done();
};

//I can't figure out how to run different tasks for js/libs.js and js/main.js, so the same task is repeated

function libs(done){
  jsLibs.map( function(entry){
    return browserify({
      entries: [jsSRC + entry]
    })
    .transform( babelify, { presets: [ '@babel/preset-env']})
    .bundle()
    .pipe( source(entry))
    .pipe( rename({
      extname: '.min.js'
    }))
    .pipe(buffer())
    .pipe( sourcemaps.init({ loadMaps: true }))
    .pipe( uglify())
    // .pipe( sourcemaps.write('.'))
    .pipe(gulp.dest( jsURL ))
    .pipe( browserSync.stream() );
    // .pipe(browserSync.reload({stream:true}));
  });
  done();
};

function js(done){
    jsFiles.map( function(entry){
      return browserify({
        entries: [jsSRC + entry]
      })
      .transform( babelify, { presets: [ '@babel/preset-env']})
      .bundle()
      .pipe( source(entry))
      .pipe( rename({
        extname: '.min.js'
      }))
      .pipe(buffer())
      .pipe( sourcemaps.init({ loadMaps: true }))
      .pipe( uglify())
      .pipe( sourcemaps.write('.'))
      .pipe(gulp.dest( jsURL ))
      .pipe( browserSync.stream() );
      // .pipe(browserSync.reload({stream:true}));
    });
    done();
};


function reload(done){
    browserSync.reload();
    done();
};  

//Watch files for changes
function watch_files(done){
    gulp.watch('dev/assets/sass/**/*.scss', css);
    gulp.watch('dev/**/*.+(njk|yaml|yml)', nunjucks);
    gulp.watch('dev/**/*.html', reload); // reload browser once Nunjucks has compiled the html pages
    gulp.watch('dev/assets/js/libs.js', gulp.series(libs, reload)); //reload browser when JS files are saved
    gulp.watch(['dev/assets/js/**/*.js', '!dev/assets/js/**/*.min.js', '!dev/assets/js/libs.js'], gulp.series(js, reload)); //reload browser when JS files are saved
    done();
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
    gulp.series(css, libs, js, nunjucks, gulp.parallel(browser_sync, watch_files))
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