const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getBody} = require('../../helpers/utils'); 
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode')
const router = new Router({
    prefix:'/auth'
})

router.post('/register', async (ctx)=>{

    const {account,password,inviteCode} = getBody(ctx);

    if(account === ''||password === ''||inviteCode=== ''){
        ctx.body = {
            code:0,
            msg:'字段不能为空',
            data:null,
        }
        return;
    }

    // 找有没有邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode
    }).exec(); 
    // 验证邀请码是否找到 并且判断邀请码是否已经被授权 
    if((!findCode) || findCode.user!==''){
        ctx.body = {
            code:0,
            msg:'邀请码不正确',
            data:null,  
        }
        return;
    }

    



    
    // 去找account为传递上来的 account 用户
    const findUser = await User.findOne({
        account
    }).exec();
    // exec() 执行

    // 判断有没有该用户
    if(findUser){

        ctx.body = {
            code:0,
            msg:'用户已存在',
            data:null
        }
        return;
    }
    //创建一个用户
    const user = new User({
        account,
        password,
    });


    // 把创建的用户同步到 mongoDB
    const res = await user.save();
    // 将所创建用户的_id 传递给邀请码中的user内
    findCode.user = res._id;
    findCode.meta.updatedAt = new Date().getTime();
    // 将邀请码信息 同步更新到mongoDB
    await findCode.save();



    ctx.body = {
       code:1,
       msg:'注册成功',
       data:res,
   }
});
router.post('/login', async (ctx)=>{
    const {account,password} = getBody(ctx); 

    if(account === ''||password === ''){
        ctx.body = {
            code:0,
            msg:'字段不能为空',
            data:null,
        }
        return;
    }
    // 注意：one的对象不纯净 直接引入token 会报错
    const one = await User.findOne({
        account
    }).exec();

    const userOne = {
        account:one.account,
        _id:one._id
    }
    if(!one){
        ctx.body = {
            code:0,
            msg:'用户名或密码错误',
            data:null
        }
        return;
    }
    if(one.password === password){
        ctx.body = {
            code:1,
            msg:'登录成功',
            data:{
                user:userOne,
                token:jwt.sign(userOne,'book-mgr')
            }
        }
        return;
    }
    ctx.body = {
        code:0,
        msg:'用户名或密码错误',
        data:null,
    }
});

module.exports = router;