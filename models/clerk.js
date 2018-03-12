const mongoose = require('mongoose');

const clerkSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
  performance: { type: Number, default: 0 }
});

module.exports = mongoose.model('Clerk', clerkSchema);
