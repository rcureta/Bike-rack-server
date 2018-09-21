'use strict';

const mongoose = require('mongoose');

const rackSchema = new mongoose.Schema({
  name: { 
    type: String
  },
  latitude: {
    type: Number, required: true
  },
  longitude: {
    type: Number, required: true
  },
  occupancy: {
    type: String
  },
  createdAt: {
    type: Date, default: Date.now
  }
});

rackSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('rack', rackSchema);
