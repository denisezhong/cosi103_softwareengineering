//router for transactionapp

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
  
  // get the value associated to the key
  /*router.get('/todo/',
    isLoggedIn,
    async (req, res, next) => {
        const show = req.query.show
        const completed = show=='completed'
        let items=[]
        if (show) { // show is completed or todo, so just show some items
          items = 
            await ToDoItem.find({userId:req.user._id, completed})
                          .sort({completed:1,priority:1,createdAt:1})
        }else {  // show is null, so show all of the items
          items = 
            await ToDoItem.find({userId:req.user._id})
                          .sort({completed:1,priority:1,createdAt:1})
  
        }
              res.render('toDoList',{items,show,completed});
  });
  */
  
  router.post('/transaction',
    isLoggedIn,
    async (req, res, next) => {
        const transaction = new Transaction(
          {
            userId: req.user._id,
            description: req.body.description,
            category: req.body.category,
            amount: req.body.amount,
            date: new Date(req.body.date)
          })
        await transaction.save();
        res.redirect('/transaction')
  });
  
  router.get('/transaction/remove/:itemId',
    isLoggedIn,
    async (req, res, next) => {
        console.log("inside /transaction/remove/:itemId")
        await Transaction.deleteOne({_id:req.params.itemId});
        res.redirect('/transaction')
  });

  router.get('/transaction/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transaction/edit")
      const item = 
       await Transaction.findById({_id:req.params.itemId});
      //res.render('edit', { item });
      res.locals.item = item
      res.render('edittransaction')
      //res.json(item)
});

  router.get('/transaction/category',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /transaction/groupByCategories");
    res.locals.transactions = await Transaction.find({userId:req.user._id}).sort({ category: 'asc' });
    const sumAmount = {};
    res.locals.transactions.forEach(transaction => {
      if (!sumAmount[transaction.category]) {
        sumAmount[transaction.category] = 0;
      }
      sumAmount[transaction.category] += transaction.amount;
    });
    const categories = Object.keys(sumAmount);
    res.render('category', { categories, sumAmount });
  });

    //res.locals.categories = await Category.find({userId:req.user._id})
    //res.render('category');
    //res.render('transaction');
    //res.render('category')
  //});
/*
  router.get('/transaction/category',
  isLoggedIn,
  async (req, res, next) => {
    console.log("inside /transaction/groupByCategories");
      let results =
            await Transaction.aggregate(
                [ 
                  {$group:{
                    category:'$category',
                    amount:{$amount:{}}
                    }},
                  {$sort:{total:-1}},              
                ])
              
        results = 
           await Transaction.populate(results,
                   {path:'_id',
                   select:['category']})

        //res.json(results)
        res.render('category',{results})
});
*/

  
  router.get('/transaction',
    isLoggedIn,
    async (req, res, next) => {
      const sortBy = req.query.sortBy;
      console.log(sortBy);
     
      if (sortBy === 'item') {
        res.locals.transactions = await Transaction.find({userId:req.user._id})
                                                  .sort({ item: 'asc' });
      } else if (sortBy === 'description') {
        res.locals.transactions = await Transaction.find({userId:req.user._id})
                                                    .sort({ description: 'asc' });
      } 
      else if (sortBy === 'amount') {
        res.locals.transactions = await Transaction.find({userId:req.user._id})
                                                    .sort({ amount: 'asc' });
      }else if (sortBy === 'category') {
        res.locals.transactions = await Transaction.find({userId:req.user._id})
                                                    .sort({ category: 'asc' });
      } else if (sortBy == 'date'){
        res.locals.transactions = await Transaction.find({userId:req.user._id})
                                                    .sort({ date: 'asc' });
      } else {
        res.locals.transactions = await Transaction.find({ userId: req.user._id });
      }
    res.render('transaction');
    //  res.redirect('/transaction')
    });
  
    /*
  router.get('/transaction/edit/:itemId',
    isLoggedIn,
    async (req, res, next) => {
        console.log("inside /transaction/edit/:itemId")
        await transactionapp.findOneAndUpdate(
          {_id:req.params.itemId});
          req.render('edit')
        res.redirect('/transaction')
  }); */



  
  router.post('/transaction/updateTransaction',
    isLoggedIn,
    async (req, res, next) => {
        const {itemId, description, category, amount, date} = req.body;
        console.log("inside /updateTransaction/:itemId");
        await Transaction.findOneAndUpdate(
          {_id: itemId},
          {$set: {description, category, amount, date}} 
          );
        console.log("inside /transaction/updatePart2");
        res.redirect('/transaction')
  });
  
/*
  router.get('/todo/byUser',
    isLoggedIn,
    async (req, res, next) => {
        let results =
              await ToDoItem.aggregate(
                  [ 
                    {$group:{
                      _id:'$userId',
                      total:{$count:{}}
                      }},
                    {$sort:{total:-1}},              
                  ])
                
          results = 
             await User.populate(results,
                     {path:'_id',
                     select:['username','age']})
  
          //res.json(results)
          res.render('summarizeByUser',{results})
  });
  */
  
  module.exports = router;
  