/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// Import data model
const Document = require('../model');

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    // handler for request of new book...
    .post(async function (req, res) {
      console.log('post request');
      try {
        console.log('req.body: ', req.body);
        // ...creates a document...
        let document = new Document({
          title: req.body.title
        });
        // ...saves it in the database...
        const doc = await document.save();
        // ...returns data...
        res.json(doc);
        //response will contain new book object including atleast _id and title
      } catch (error) {
        console.log(error);
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
