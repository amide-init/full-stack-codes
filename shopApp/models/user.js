const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type:String, required: true},
    lastname: {type:String},
    email: {type:String, required: true},
    password: {type:String, required: true},
    date: {type:Number, required: true}
});

module.exports = mongoose.model('user', userSchema);