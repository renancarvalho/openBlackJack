var gulp 			= require("gulp");
var webpack   = require('gulp-webpack');
var webserver = require('gulp-webserver');
var w         = require('webpack');
var less      = require('gulp-less');
var path      = require('path');
var PORT 			= 8000;

function onError () {
  this.emit('end');
};


gulp.task('less', function () {
  return gulp.src('front/style/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('front/style/'));
});

gulp.task('webpack', function () {
  return gulp.src(['front/js/main.js','front/js/view/template/*.handlebars'])
    .pipe(webpack({
      output: {
        filename: 'main.js'
      },
      resolve: {
        extensions: ['', '.js', '.json']
      }, 
      module: {
        loaders: [
          { test: /\.handlebars$/, loader: "handlebars-loader" }
        ]
      },
      plugins: [
        new w.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          _: 'underscore',
          Backbone: 'backbone',
          io: 'socket.io-client/socket.io.js'
        })
      ]
    }))
    .pipe(gulp.dest('build/'));
});


gulp.task('webserver', function () {
  return gulp.src('.')
    .pipe(webserver({
      livereload: false,
      open: true,
      port: PORT
    }));
});

gulp.task('watch', function () {
  gulp.watch('front/js/**/*.js', ['webpack']);
  gulp.watch('front/style/**/*.less', ['less']);
  gulp.watch('front/js/view/template/*.handlebars', ['webpack']);
});

gulp.task('run', ['webpack','watch','less']);
