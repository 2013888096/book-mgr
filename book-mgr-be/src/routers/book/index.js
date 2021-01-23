const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getBody} = require('../../helpers/utils')

const Book = mongoose.model('Book');

const router = new Router({
    prefix:'/book',
});

router.post('/add', async (ctx)=>{
    // console.log(ctx.request.body);
    const {
        name,
        price,
        author,
        publishDate,
        classify
    } = getBody(ctx);
    // 易错点form本身是一个对象 用...解构  或者 getBody().form

    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify
    })
    const res = await book.save();

    ctx.body = {
        code:1,
        data:res,
        msg:'添加成功'
    }

})

router.get('/list',async (ctx)=>{
    const list = await Book.find().exec();

    ctx.body = {
        code:1,
        data:list,
        msg:'获取列表成功'
    }
})

module.exports = router;