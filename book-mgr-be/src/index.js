const Koa = require('koa');

const app = new Koa();

// context = ctx
// app.use 充当中间件 每次请求都会执行一次
// context上下文 -- 当前请求的详细信息
app.use((ctx)=>{
    const { path ='/' } = ctx;
    if(path === '/user'){
        ctx.body = '返回用户信息'
    }
    if(path ==='/admin'){
        ctx.body = '返回后台信息 '
    }
});

app.listen(3000,()=>{
    console.log('启动成功','http://localhost:3000');
})