const zookeeper = require('node-zookeeper-client');
const loadbalance = require('loadbalance');
const cache = require('./local-storage');
const constants = require('./constants');

let zkClient = zookeeper.createClient(constants.ZK_HOSTS);
cache.setItem(constants.ROUTE_KEY, {});


async function connect() {
    return new Promise(function (resolve, reject) {
        zkClient.connect();

        zkClient.once('connected', async function() {
            console.log('Connected to ZooKeeper.');
            await getServices(constants.SERVICE_ROOT_PATH);
            resolve();
        });
    });
}

/**
 * 获取服务列表
 */
async function getServices(path) {
    return new Promise(function (resolve, reject) {
        zkClient.getChildren(
            path,
            function(event) {
                console.log('Got Services watcher event: %s', event);
                getServices(constants.SERVICE_ROOT_PATH);
            },
            async function(error, children, stat) {
                if (error) {
                    console.log(
                        'Failed to list children of %s due to: %s.',
                        path,
                        error
                    );
                    reject(error);
                } else {
                    // 遍历服务列表，获取服务节点信息
                    for (let item of children) {
                        await getService(path + '/' + item);
                    }
                    resolve();
                }
            }
        );
    });
}

/**
 * 获取服务节点信息（IP,Port）
 */
async function getService(path) {
    return new Promise(function (resolve, reject) {
        zkClient.getChildren(
            path,
            function(event) {
                console.log('Got Serivce watcher event: %s', event);
                getService(path);
            },
            function(error, children, stat) {
                if (error) {
                    console.log(
                        'Failed to list children of %s due to: %s.',
                        path,
                        error
                    );
                    reject(error);
                } else {
                    // 打印节点信息
                    console.log('path: ' + path + ', children is ' + children);

                    if (children.length > 0) {
                        //设置本地缓存和负载策略
                        cache.getItem(constants.ROUTE_KEY)[path] = loadbalance.roundRobin(children);
                    }
                    resolve();
                }
            }
        );
    });
}

module.exports = connect;