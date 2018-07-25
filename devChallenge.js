"use strict";

// var config = require(config);
var express = require('express');
var bodyParser = require('body-parser');
var endPoints = require('./endPoints');

module.exports = {
    spinUp : function(config, _app) {

        let app = _app || express();

        // config defaults
        config.taskRemote || (config.taskRemote = '/challenge');
        config.taskRoot   || (config.taskRoot = 'challenge');
        config.apiRoot    || (config.apiRoot = '');

        // session
        if(config.withSession) {
            let session = require('express-session');
            app.use(session({
                secret: 'what3v3R',
                resave: false,
                saveUninitialized: true
            }));
        }

        // challenges
        for(let task of config.tasks) {
            app.use(`${config.taskRemote}/${task}.js` , express.static(`${config.taskRoot}/${task}/front.js`));
            app.get(`${config.taskRemote}/${task}/data.js` , function(req, res) {
                try {
                    endPoints.data(config, task, req, res);
                } catch(exception) {
                    if(config.onDataError) {
                        config.onDataError(exception, req, res);
                    } else {
                        console.error(exception);
                        if(exception.code && exception.code == 'MODULE_NOT_FOUND') {
                            res.sendStatus(404);
                        } else {
                            res.sendStatus(500);
                        }
                    }
                }
            });
        }

        // routing
        let urlencodedParser = bodyParser.urlencoded({ extended: true });
        app.post(`${config.apiRoot}/check`, urlencodedParser, function (req, res) {
            try {
                endPoints.check(config, req, res);
            } catch(exception) {
                if(config.onError) {
                    config.onError(exception, req, res);
                } else {
                    console.error(exception);
                    res.sendStatus(500);
                }
            }
        });

        app.get(`${config.apiRoot}/jumpTo`, function(req, res) {
            try {
                endPoints.jumpTo(config, req, res);
            } catch(exception) {
                if(config.onError) {
                    config.onError(exception, req, res);
                } else {
                    console.error(exception);
                    res.sendStatus(500);
                }
            }
        });

        return app;
    }
};
