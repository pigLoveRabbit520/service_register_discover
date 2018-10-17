"use strict";

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define('ZK_HOSTS', '127.0.0.1:2181,127.0.0.1:2182,127.0.0.1:2183');
define('SERVICE_ROOT_PATH', '/services');
define('ROUTE_KEY', 'services');
define('SERVICE_NAME', 'service_name');
define('API_NAME', 'api_name');