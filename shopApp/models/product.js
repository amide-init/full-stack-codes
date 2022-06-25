const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type:String, required: true},
    description: {type:String},
    price: {type:Number, required: true},
    thumbnail: {type:String, required: true},
    date: {type:Number, required: true}
});

module.exports = mongoose.model('product', productSchema);