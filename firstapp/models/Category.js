//Category for group by categories
'use strict';
//const { Decimal128 } = require('bson');
const { Decimal128 } = require('mongoose');
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var Category = Schema( {
  userId: {type:ObjectId, ref:'user' },
  category: String,
  amount: Number,

} );

module.exports = mongoose.model( 'Category', Category);
