const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
// 注册schema 需要在 router流程之前
const {connect} = require('./db');
const registerRouters = require('./routers');

// 导入跨域解决包
const cors = require('@koa/cors');

const app = new Koa();

// 数据库连接成功后 在启动服务
connect().then(()=>{
    app.use(cors())
    app.use(koaBody());

    registerRouters(app);


    app.listen(3000,()=>{ 
        console.log('服务启动成功','http://localhost:3000');
    })
});  

