// require 可以执行一个文件
require('./Schemas/User');
const mongoose = require('mongoose');


// Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下 文档的构成
// Model 可以理解成时根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合，和集合下的文档

const connect =  ()=>{

    return new Promise((resolve)=>{
    // 去连接数据库 ,后面加 数据库名(没有会自动创建)
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    //监听open事件 当数据库被打开时，做一些事情
    mongoose.connection.on('open',()=>{
        console.log('数据库连接成功');
        resolve();
     })
    })
    

}
module.exports = {
    connect
}
