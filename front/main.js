'use strict';

require.config({
    shim: {
        jquery: {
            exports: '$'
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
    },
    paths: {
        jquery     : 'node_modules/jquery/dist/jquery.min',
        underscore : 'node_modules/underscore/underscore',
        backbone   : 'node_modules/backbone/backbone'
    }
});

require(
    [
        'backbone',
        'js/router'
    ],
    function (Backbone, Router) {
        var router = new Router(function(){
            Backbone.history.start({'pushState': false, 'hashChange': true});
        });
    }
);
