var proxy = require('http-proxy').createProxyServer({});
var cache = require('../middlewares/local-storage');
var constants = require("../constants");
//var debug = require('debug')('dev:reserveProxy');

function reverseProxy(req, res, next) {

    var serviceName = req.headers[constants.SERVICE_NAME];
    var apiName = req.headers[constants.API_NAME];
    var serviceNode = constants.SERVICE_ROOT_PATH + '/' + serviceName;

    console.log(cache.getItem(constants.ROUTE_KEY)[serviceNode]);

    var host = cache.getItem(constants.ROUTE_KEY)[serviceNode].pick();
    var url = 'http://' + host + apiName;
    console.log('The proxy url is ' + url);

    res.end('hello');
    // proxy.web(req, res, {
    //     target: url
    // });

    // proxy.on('error', function(e) {
    //     console.log('error happened: ' + e.message);
    // });
}

module.exports = reverseProxy;