var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {
        type:String,
        require: true,
        unique: true
    },
    userName: {
        type: String,
        require: true,
    },
    userPwd:String,
    userAddress: {
        type: String,
        default: ''
    },
    userAreaAddress: {
        type: String,
        default: ''
    },
    userPhone: {
        type: String,
        default: ''
    },
    userEmail: {
        type: String,
        default: ''
    },
    userPostCode: {
        type: String,
        default: ''
    },
    cartList: {
        type:[
            {
                goodsInfo:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'goods',
                    require: true
                },
                goodsNum: {
                    type: Number,
                    require: true
                },
                goodsChecked: {
                    type: String,
                    require: true,
                    default: '1'
                }
            }
            ],
        default: []
    },
    userBills: {
        type:[
            {
                billInfo: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Bill'
                }
            }
            ],
        default: []
    }
});

module.exports = mongoose.model("User",userSchema);
