const proxy = require('http-proxy').createProxyServer({});
const cache = require('../local-storage');
const constants = require("../constants");

function reverseProxy(req, res, next) {
    let serviceName = req.headers[constants.SERVICE_NAME];
    let apiName = req.headers[constants.API_NAME];
    let serviceNode = constants.SERVICE_ROOT_PATH + '/' + serviceName;

    console.log(cache.getItem(constants.ROUTE_KEY)[serviceNode]);

    var host = cache.getItem(constants.ROUTE_KEY)[serviceNode].pick();
    var url = 'http://' + host + apiName;
    console.log('The proxy url is ' + url);

    
    proxy.web(req, res, {
        target: url
    });

    // proxy.on('error', function(e) {
    //     console.log('error happened: ' + e.message);
    // });
}

module.exports = reverseProxy;