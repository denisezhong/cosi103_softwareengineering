//router for categories

const express = require('express');
//const bodyParser = require('body-parser');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');


isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }
  
  
  router.post('/category',
    isLoggedIn,
    async (req, res, next) => {
        const category = new Category(
          {
            userId: req.user._id,
            category: req.body.category,
            amount: req.body.amount,
          })
        await category.save();
        res.redirect('/category')
  });
  
 
  
  module.exports = router;
  