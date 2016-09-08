'use strict';

var gulp       = require('gulp'),
jshint         = require('gulp-jshint'),
jscs           = require('gulp-jscs'),
nodemon        = require('gulp-nodemon'),
compass        = require('gulp-compass'),
cssnano        = require('gulp-cssnano'),
sourcemaps     = require('gulp-sourcemaps'),
autoprefixer   = require('gulp-autoprefixer'),
changed        = require('gulp-changed'),
uglify         = require('gulp-uglify'),
notify         = require('gulp-notify'),
clean          = require('gulp-clean'),
path           = require('gulp-path'),
browserSync    = require('browser-sync').create(),
rename         = require('gulp-rename');

var jsFiles = 'public/js/src/**/*.js';

//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
  title: 'Gulp',
  // icon: path.join(__dirname, 'gulp.png')
};

//error notification settings for plumber
// var plumberErrorHandler = {
//   errorHandler: notify.onError({
//     title: notifyInfo.title,
//     icon: notifyInfo.icon,
//     message: "Error: <%= error.message %>"
//   })
// };


gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs())
    .pipe(jscs.reporter('text'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('src/**/*.html'));
});

gulp.task('styles', function() {
  return gulp.src(['public/scss/main.scss'])
    .pipe(compass({
      css: './public/scss/css',
      sass: './public/scss',
      image: './public/img'
    }))
    .pipe(autoprefixer('last 2 version'))
    // .pipe(gulp.dest('./public/scss'))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/css'));
});

gulp.task('scripts', ['lint'], function() {
  return gulp.src('public/js/**/*.js')
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('./public/js/min'))
    .pipe(changed('./public/js/**/*.js'))
    .pipe(sourcemaps.init())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp/js'));
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src(['./.tmp/css/*.css', './.tmp/js/*.js', './.tmp/js/**/*.js'], {
    read: false
  });
  var injectOptions = {
    ignorePath: '/.tmp/'
  };

  var wireDepOptions = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../public/'
  };

  return gulp.src('./src/index.html')
    // .pipe(changed('ocpclient'))
    .pipe(wiredep(wireDepOptions))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src'));
});

gulp.task('clean', function() {
  return gulp.src(['./.tmp', './prod'], {read: false})
    .pipe(clean());
});

gulp.task('clean:css', function() {
  return gulp.src('./.tmp/css', {read: false})
    .pipe(clean());
});

gulp.task('clean:js', function() {
  return gulp.src('./.tmp/js/', {read: false})
    .pipe(clean());
});

gulp.task('live', function() {

  // process.env.PORT = 9000;
  // var PORT = process.env.PORT;

  // browserSync.init({
  //   proxy: 'localhost:' + PORT
  // });

  // watch .html files
  gulp.watch('src/**/*.html');

  //watch .scss files
  gulp.watch('public/scss/**/*.scss', ['clean:css', 'styles', 'inject']);

  //watch .js files
  gulp.watch('public/js/**/*.js', ['clean:js', 'lint', 'scripts', 'inject']);

  // gulp.watch(['src/**/*.html', 'public/css/main.min.css', 'public/js/min/**/*.js']).on('change', browserSync.reload);

  //reload when a template file, the minified css, or the minified js file changes
  // gulp.watch(['src/**/*.html', '.tmp/css/main.min.css', '.tmp/js/**/*.js'], function(event) {
  //   gulp.src(event.path)
  //     .pipe(browserSync.stream())
  //     .pipe(notify({
  //       title: notifyInfo.title,
  //       icon: notifyInfo.icon,
  //       message: event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was ' + event.type + ' and reloaded'
  //     }));
  // });
});

gulp.task('serve', ['clean', 'lint', 'styles', 'scripts', 'inject', 'live'], function() {

  var options = {
    script: 'server.js',
    delayTime: 1,
    env: {
      'NODE_ENV': 'local',
      'PORT': 9000
    },
    watch: jsFiles
  };
  
  return nodemon(options)
    .on('restart', function(ev) {
      console.log('Restarting...');
    });
});

// BUILD TASK
// ===============================================

gulp.task('clean:build', function() {
  return gulp.src('./prod', {read: false})
    .pipe(clean());
});

gulp.task('html:build', ['clean:build'], function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('./prod/src'));
});

gulp.task('styles:build', ['html:build'], function() {
  return gulp.src('public/scss/main.scss')
    .pipe(compass({
      css: './public/scss/css',
      sass: './public/scss',
      image: './public/img'
    }))
    .pipe(autoprefixer('last 2 version'))
    // .pipe(gulp.dest('./public/css'))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./prod/public/css'));
});

gulp.task('scripts:build', ['styles:build'], function() {
  return gulp.src('public/js/**/*.js')
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('./public/js/min'))
    // .pipe(changed('./public/js/**/*.js'))
    .pipe(sourcemaps.init())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./prod/public/js'));
});

gulp.task('inject:build', ['scripts:build'], function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var injectSrc = gulp.src(['./prod/public/css/*.css', './prod/public/js/*.js', './prod/public/js/**/*.js'], {
    read: false
  });
  var injectOptions = {
    ignorePath: 'prod/public/'
  };

  var wireDepOptions = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../public/'
  };

  return gulp.src('./prod/src/index.html')
    // .pipe(changed('ocpclient'))
    .pipe(wiredep(wireDepOptions))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./prod/src'));
});

gulp.task('build', ['inject:build'], function() {
  gulp.src(['server.js', 'config.js', 'run_local.sh', 'run_dev3.sh', 'run_prod1.sh'])
  .pipe(gulp.dest('./prod'))
  gulp.src('public/img/**/*')
  .pipe(gulp.dest('./prod/public/img'))
  gulp.src('public/lib/**/*')
  .pipe(gulp.dest('./prod/public/lib'))
});

gulp.task('serve:prod', function() {

  var options = {
    script: 'prod/server.js',
    delayTime: 1,
    env: {
      'NODE_ENV': 'local',
      'PORT': 9001
    },
    watch: './server.js'
  };
  
  return nodemon(options)
    .on('restart', function(ev) {
      console.log('Restarting...');
    });
});
