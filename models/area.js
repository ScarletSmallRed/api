const mongoose = require('mongoose');

const areasSchema = mongoose.Schema({
    areaName: { type: String },
    areaTime: { type: String },
    areaDescription: { type: String },
    areaStartTime:[{type: String}]
});

module.exports = mongoose.model('area', areasSchema);