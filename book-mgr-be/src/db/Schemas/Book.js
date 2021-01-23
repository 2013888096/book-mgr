const mongoose = require('mongoose');
const {getMate} = require('../helpers');

const BookSchema = new mongoose.Schema({
    // 书名
    name:String,
    // 价格
    price:Number,
    // 分类
    classify:String,
    // 作者
    author:String,
    // 出版日期
    publishDate:String,
    meta:getMate()
})
// 注册
mongoose.model('Book',BookSchema);