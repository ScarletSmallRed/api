const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  goodsList: [
    {
      goodsInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goods'
      },
      quantity: { type: Number },
      actualQuantity: { type: Number, default: null }
    }
  ],
  totalPrice: { type: Number, require: true },
  userInfo: {
    userEmail: {
      type: String,
        default: '',
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    userName: { type: String },
    homeAddress: {
      type: String,
      required: true
    },
    areaAddress: {
      type: String,
      required: true
    },
    phone: { type: String, default: '' },
    postCode: { type: String, default: '' }
  },
  orderDate: { type: Date, default: Date.now },
  doNumber: { type: Number },
  shippingDate: { type: Date, default: null },
  travelNumber: { type: Number, default: null },
  completeDate: { type: Date, default: null },
  invNumber: { type: Number, default: null },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clerk',
    default: null
  },
  state: { type: Number, default: 0 }
});

module.exports = mongoose.model('Bill', billSchema);
