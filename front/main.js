require.config({
    shim: {
        jquery: {
            exports: '$'
        },
        socketio: {
            exports: 'io'
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
        },
        handlebars: {
            exports: 'Handlebars'
        }

    },
    paths: {
        jquery     : 'node_modules/jquery/dist/jquery.min',
        underscore : 'node_modules/underscore/underscore',
        backbone   : 'node_modules/backbone/backbone',
        text       : 'node_modules/requirejs-text/text',
        hb         : 'node_modules/requirejs-handlebars/hb',
        'handlebars.runtime': 'node_modules/handlebars/handlebars.runtime.amd',
        socketio: 'https://cdn.socket.io/socket.io-1.0.6'
    },
    packages: [
    {
        name: 'handlebars',
        location: 'node_modules/handlebars/dist/amd',
        main: './handlebars'
    }
    ]
});

require(
    [
    'backbone',
    'js/router'
    ],
    function (Backbone, Router) {
            var router = new Router();
            router.start();
        }
    );
