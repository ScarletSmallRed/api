const mongoose = require('mongoose');

const goodsSchema = mongoose.Schema({
    goodsName: { type: String },
    goodsSize: { type: String },
    goodsPrice: { type: Number },
    goodsImage: { type: String },
    goodsCategory: {type: String, require: true},
    goodsDescription:{type: String,default: '这里写小红要求的描述！！！'},
    goodsSold:{type:Number,default: 0}
});

module.exports = mongoose.model('goods', goodsSchema);