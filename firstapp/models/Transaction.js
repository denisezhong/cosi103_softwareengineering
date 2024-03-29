//Transaction app for PA04
'use strict';
//const { Decimal128 } = require('bson');
const { Decimal128 } = require('mongoose');
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var Transaction = Schema( {
  userId: {type:ObjectId, ref:'user' },
  description: String,
  amount: Number,
  category: String,
  date: Date,

} );

module.exports = mongoose.model( 'Transaction', Transaction);
