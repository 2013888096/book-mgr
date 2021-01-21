const mongoose = require('mongoose');
const {getMate} = require('../helpers');

const UserSchema = new mongoose.Schema({
    account : String,
    password: String,
    meta:getMate()
})
// 注册
mongoose.model('User',UserSchema);