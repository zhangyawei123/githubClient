let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let httpUrl= localhostDev ? 'http://192.168.0.69:8080/xjy-web-user/' : 'http://xxx.com';
export {httpUrl}
