const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = new Router({
    prefix:'/auth'
})

router.post('/register', async (ctx)=>{

    const {account,password} = ctx.request.body;
    const user = new User({
        account,
        password,
    });

    const one = await User.findOne({
        account
    }).exec();
    // exec() 执行

    if(one){

        ctx.body = {
            code:0,
            msg:'用户已存在',
            data:null
        }
        return;
    }

    const res = await user.save();
    ctx.body = {
       code:1,
       msg:'注册成功',
       data:res,
   }
});
router.post('/login', async (ctx)=>{
   
});

module.exports = router;