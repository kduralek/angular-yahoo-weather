/*jshint node:true*/
'use strict';

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var logger = require('morgan');
var YQL = require('yql');
var paths = require('./gulp.config.json');

var app = express();
var port = process.env.PORT || 7200;
var environment = process.env.NODE_ENV;

app.use(session({
    secret: 'My super session secret',
    cookie: {
        httpOnly: true
    },
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());            // Compress response data with gzip
app.use(logger('dev'));
app.use(cors());                // enable ALL CORS requests

console.log('Starting Express web server...');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function (req, res) {
    res.send('pong');
});

app.get('/api/weather/:zipcode', getWeatherByZipCode);

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        console.log('serving from ' + paths.build);
        app.use('/', express.static(paths.build));
        break;
    default:
        console.log('** DEV **');
        console.log('serving from ' + './');
        app.use('/', express.static('./'));
        break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});

//////////
function getWeatherByZipCode(req, res) {
    var reqParam = req.params.zipcode,
        reqParamArray,
        zipCode,
        query;

    // validate input params
    if (reqParam === undefined || reqParam === null) {
        return res.status(404).send();
    }

    reqParamArray = reqParam.split(',');
    for (var i = 0; i < reqParamArray.length; i++) {
        var code = reqParamArray[i];
        var parsedCode = parseInt(code);
        if (code.length !== 5 || parsedCode !== +code) {
            return res.status(404).send();
        }
    }

    zipCode = reqParamArray.length === 1 ? reqParamArray[0] : reqParam;
    query = new YQL('select *from weather.forecast where woeid in (select woeid from geo.places(1) where text in (' + zipCode + '))');
    query.exec(function(err, data) {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }
    });
}
