const mongoose = require('mongoose');
const Recording = require('../models/recording');

exports.recordings_creating_recording = (req, res, next) => {
  Recording.create(req.body)
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.recordings_get_all = (req, res, next) => {
  let currentPage =
    parseInt(req.params.page) > 0 ? parseInt(req.params.page) : 1;
  let pageSize =
    parseInt(req.params.pageSize) > 0 ? parseInt(req.params.pageSize) : 10;
  // 要跳过多少条
  let skip = (currentPage - 1) * pageSize;
  Recording.find()
    .limit(pageSize)
    .skip(skip)
    .populate('operator clerk goods bill')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.recordings_search_recording = (req, res, next) => {
  let currentPage =
    parseInt(req.params.page) > 0 ? parseInt(req.params.page) : 1;
  let pageSize =
    parseInt(req.params.pageSize) > 0 ? parseInt(req.params.pageSize) : 10;
  // 要跳过多少条
  let skip = (currentPage - 1) * pageSize;
  Recording.find({
    time: {
      $gte: new Date(req.body.start),
      $lte: new Date(req.body.end)
    }
  })
    .limit(pageSize)
    .skip(skip)
    .populate('operator clerk goods')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};
