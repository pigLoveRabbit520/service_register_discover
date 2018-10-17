# 使用
1. 先启动注册中心，zk集群：`docker-compose -f zookeeper.yml up -d`
2. 启动Registrator，监听docker，自动注册服务：`docker-compose -f registrator.yml up -d`
3. 启动服务：进入services文件夹，执行`docker-compose up -d`（node服务需要先执行`npm install`）
4. 启动服务提供者：进入discovery文件夹，执行`docker-compose up -d`（node服务需要先执行`npm install`）

# 说明
* 服务提供者用node编写，连接zk集群，监听服务节点添加，删除
* 请求 http://localhost:8080/services header中service_name设为service_php（或node_service），api_name设为/（即具体请求地址）
* zookeeper是强一致性，其实并不适合做服务的注册中心
