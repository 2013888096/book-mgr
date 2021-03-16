const Router = require('@koa/router');
const mongoose = require('mongoose');
const {getBody} = require('../../helpers/utils')

const Book = mongoose.model('Book');

const BOOK_CONST={
    IN_COUNT:1,
    OUT_COUNT:2
}

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
        classify,
        count
    } = getBody(ctx);
    // 易错点form本身是一个对象 用...解构  或者 getBody().form

    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify,
        count
    })
    const res = await book.save();

    ctx.body = {
        code:1,
        data:res,
        msg:'添加成功'
    }

})

// https:www.baidu.com/user?id=1 问号后面就是query部分

router.get('/list',async (ctx)=>{
    const { 
        page=1,
        keyword=''
    } = ctx.query;
    let {size} = ctx.query;
    // size 默认为String类型

    const query = {};
    if(keyword){
        query.name=keyword;
    } 
    size = Number(size);
    const list = await Book
        .find(query)
        .skip((page-1)*size)
        .limit(size)
        .exec();
    // （page-1）*size 分页思路 
    // skit 当在XX页时 发生跳转
    // limit 表示当前查询要查几条


    // Book.countDocuments() 查找Book下所有文档条数
    const total = await Book.countDocuments();

    ctx.body = {
        code:1,
        data:{
            total,
            list,
            page,
            size
        },
        msg:'获取列表成功'
    }
})

router.delete('/:id',async (ctx)=>{
    const {
        id
    } = ctx.params;

    const delMsg =  await Book.deleteOne({
        _id:id
    })
    ctx.body = {
        data:delMsg,
        msg:'删除成功',
        code:'1'
    }
})



router.post('/update/count',async(ctx)=>{
    const {
        id,
        type
    } = ctx.request.body;

    let {
        num
    }=ctx.request.body;
    num = Number(num);

    const book = await Book.findOne({
        _id:id
    })
    .exec();
    if(!book){
        ctx.body = {
            code:0,
            msg:'没有找到书籍'
        }
    }
    if(type === BOOK_CONST.IN_COUNT){
        num = Math.abs(num);
    }else{
        num = -Math.abs(num);
    }
    book.count = book.count + num;
    if(book.count<0){
        ctx.body = {
            code:0,
            msg:'剩下的量不足以出库'
        }
        return;
    } 

    const res = await book.save();
    ctx.body = {
        data:res,
        code:1,
        msg:'操作成功'
    }

})

router.post('/update',async(ctx)=>{
    // id 用于查找到书籍
    // ...others 所修改数据的对象
    // ...others后面不能加逗号
    const {
          id,
          ...others
    }=ctx.request.body;
    
    const one = await Book.findOne({
        _id:id,
    }).exec();

    // 没有找到书
    if(!one){
        ctx.body = {
            msg:'没有找到相关书籍',
            code:0
        }
        return;
    }
    // 存储修改的数据
    const newQuery = {};
    // 注意符号[]
    Object.entries(others).forEach(([key,value])=>{
        if(value){
            newQuery[key] = value;
        }
    }); 
 

    Object.assign(one,newQuery);
    const res = await one.save();
    ctx.body = {
        data:res,
        msg:'修改成功',
        code:'1'
    }

})

module.exports = router;