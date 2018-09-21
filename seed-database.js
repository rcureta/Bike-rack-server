'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const Racks = require('../models/rack');

const seedRacks = require('../db/seed/racks');

mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Racks.insertMany(seedRacks),
      Racks.createIndexes()

    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });
