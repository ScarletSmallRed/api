const mongoose = require('mongoose');
const Bill = require('../models/bill');

exports.bills_get_all = (req, res, next) => {
  let currentPage =
    parseInt(req.params.page) > 0 ? parseInt(req.params.page) : 1;
  let pageSize =
    parseInt(req.params.pageSize) > 0 ? parseInt(req.params.pageSize) : 10;
  // 要跳过多少条
  let skip = (currentPage - 1) * pageSize;
  if (req.params.state === '999') {
    Bill.find()
      .limit(pageSize)
      .skip(skip)
      .populate('goodsList.goodsInfo operator')
      .then(doc => {
        console.log(doc);
        res.send(doc);
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
  if (req.userData.role === '配单员' && req.params.state === '666') {
    Bill.find({
      state: req.params.state,
      operator: { _id: req.userData.clerkId }
    })
      .limit(pageSize)
      .skip(skip)
      .populate('goodsList.goodsInfo operator')
      .then(doc => {
        console.log(doc);
        res.send(doc);
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
  Bill.find({ state: req.params.state })
    .limit(pageSize)
    .skip(skip)
    .populate('goodsList.goodsInfo operator')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.bills_get_bill = (req, res, next) => {
  const _id = req.params.billId;
  Bill.find({ _id: _id })
    .populate('goodsList.goodsInfo operator')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.bills_create_bill = (req, res, next) => {
  Bill.create(req.body)
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
};

exports.bills_update_bill = (req, res, next) => {
  const _id = req.params.billId;
  // if (req.body.biaoJi) {
  //   Bill.update(
  //     {
  //       _id: _id,
  //       goodsList: { $elemMatch: { _id: req.body._id } }
  //     },
  //     { $set: { 'goodsList.$.actualQuantity': req.body.actualQuantity } }
  //   ).then(doc => {
  //     res.send(doc);
  //   });
  //   return;
  // }
  if (req.body.actualQuantity) {
    const data = req.body.actualQuantity;
    Bill.findById(_id)
      .then(doc => {
        for (var i = 0; i < doc.goodsList.length; i++) {
          doc.goodsList[i].actualQuantity = data[i];
          doc.markModified('actualQuantity');
          doc.save();
        }
        res.send(doc);
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }

  Bill.update({ _id: _id }, req.body)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });

  // if (req.body.state === 2 || req.body.state === 3) {
  //   Bill.updateMany({ _id: _id }, req.body).then(doc => {
  //     return;
  //   });
  //   return;
  // }
  // if (req.body.state === 0) {
  //   Bill.updateMany({ _id: _id }, req.body).then(doc => {
  //     return;
  //   });
  //   return;
  // }
  // const data_1 = {
  //   totalPrice: req.body.totalPrice,
  //   state: req.body.state,
  //   shippingDate: req.body.shippingDate,
  //   invNumber: req.body.invNumber,
  //   operator: req.body.operator
  // };
  // const data_2 = req.body.actualQuantity;
  // Bill.updateMany({ _id: _id }, data_1)
  //   .then(doc => {
  //     Bill.findById(_id)
  //       .then(doc => {
  //         for (var i = 0; i < doc.goodsList.length; i++) {
  //           doc.goodsList[i].actualQuantity = data_2[i];
  //           doc.markModified('actualQuantity');
  //           doc.save();
  //         }
  //         res.send(doc);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //     res.send(doc);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.send(err);
  //   });
};

exports.bills_delete_bill = (req, res, next) => {
  Bill.remove({ _id: req.params.billId })
    .then(doc => {
      console.log(doc);
      if (doc.n === 1) {
        res.status(200).json({
          message: '删除订单成功'
        });
      } else {
        res.status(404).json({
          message: '订单不存在'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.bills_search_bill = (req, res, next) => {
  let currentPage =
    parseInt(req.params.page) > 0 ? parseInt(req.params.page) : 1;
  let pageSize =
    parseInt(req.params.pageSize) > 0 ? parseInt(req.params.pageSize) : 10;
  // 要跳过多少条
  let skip = (currentPage - 1) * pageSize;
  Bill.find({
    orderDate: {
      $gte: new Date(req.body.start),
      $lte: new Date(req.body.end)
    }
  })
    .limit(pageSize)
    .skip(skip)
    .populate('goodsList.goodsInfo operator')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};
