const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: {type:String, required: true},
    amount:{type:Number, required: true},
    address: {type:String, required: true},
    product_id:{type:String, required: true},
    date: {type:Number, required: true}
});

module.exports = mongoose.model('address', addressSchema);