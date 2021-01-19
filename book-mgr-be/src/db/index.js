const mongoose = require('mongoose');
// 1.给哪个数据库的
// 哪个集合
// 添加什么格式的文档

// Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下 文档的构成
// Modal 可以理解成时根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合，和集合下的文档

const UserSchema = new mongoose.Schema({
    nickname:String,
    password:String,
    age:Number
})
// 是一个类(构造函数) 使用要用new
const UserModal = mongoose.model('User',UserSchema);




const connect = ()=>{
    // 去连接数据库 ,后面加 数据库名(没有会自动创建)
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    //监听open事件 当数据库被打开时，做一些事情
    mongoose.connection.on('open',()=>{
        console.log('连接成功');
        // 创建文档
        const user = new UserModal({
            nickname:'小蓝',
            password:'123456',
            age:12
        });
        user.age = 99;
        // // 保存，同步到 MongoDB
        user.save();

    })

}
connect();