require.config({
    // urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery                      : '../node_modules/jquery/dist/jquery.min',
        jasmine                     : 'lib/jasmine-2.2.0/jasmine',
        'jasmine-html'              : 'lib/jasmine-2.2.0/jasmine-html',
        underscore                  : '../node_modules/underscore/underscore',
        backbone                    : '../node_modules/backbone/backbone',
        'jasmine-boot'              : 'lib/jasmine-2.2.0/boot'
    },
    shim: {
        'jasmine-html': {
            deps : ['jasmine']
        },
        'jasmine-boot': {
            deps : ['jasmine', 'jasmine-html']
        },
        underscore: {
          exports: '_'
        },
        backbone: {
            deps: [
            'underscore',
            'jquery'
            ],
            exports: 'Backbone'
        }
    }
});


require(['jasmine-boot'], function () {
  require(['../test/spec/singleGameCollectionSpec'], function(){
    debugger;
    window.onload();
  })
});