var gulp 			= require("gulp");
var webpack   = require ('gulp-webpack');
var webserver = require ('gulp-webserver');
var w         = require ('webpack');
var PORT 			= 8000;

function onError () {
  this.emit('end');
};

gulp.task('webpack', function () {
  return gulp.src('js/main.js')
    .pipe(webpack({
      output: {
        filename: 'main.js'
      },
      resolve: {
        extensions: ['', '.js']
      }, 
      plugins: [
        new w.ProvidePlugin({
          $: 'jquery'
          , jQuery: 'jquery'
          , _: 'underscore'
          , Backbone: 'backbone'
          , io: 'socket.io-client/socket.io.js'
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
  gulp.watch('js/**/*.js', ['webpack']);
});


gulp.task('run', ['webpack','watch', 'webserver']);
