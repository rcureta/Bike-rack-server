'use strict';

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Rack = require('../models/rack');

const router = express.Router();

// function validateCategoryId(categoryId) {
//   if (categoryId === undefined) {
//     return Promise.resolve();
//   }

//   if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//     const err = new Error('The `categoryId` is not valid');
//     err.status = 400;
//     return Promise.reject(err);
//   }
// }

/* ========== GET/READ ALL TRIPS ========== */
router.get('/', (req, res, next) => {
  Rack.find()
    .then(results => {
      console.log(results);
      res.json({racks: results});
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE TRIP ========== */
router.get('/:id', (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Rack.findOne({ _id: id })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const {  latitude,longitude} = req.body;


  const newRack = { latitude,longitude}  
  /***** Never trust users - validate input *****/

  if (!latitude) {
    const err = new Error('Missing `latitude` in request body');
    err.status = 400;
    return next(err);
  }

  if (!longitude) {
    const err = new Error('Missing `longitude` in request body');
    err.status = 400;
    return next(err);
  }
  Rack.create(newRack)
    .then(result => {
      res.status(201)
        .location(`${req.originalUrl}/${result.id}`)
        .json(result);
    })
    .catch(err => {
      next(err);
    })
});


router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, latitude, longitude, occupancy } = req.body;

  const updateTrip = { name, latitude,longitude, occupancy };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Rack.findByIdAndUpdate(id, updateRack, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


router.delete('/', (req, res, next) => {
  const id = req.body.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Rack.findOneAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
