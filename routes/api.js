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

    // handler for reading books...
    .get(async function (req, res) {
      try {
        // ...finds requested documents in      database... 
        let doc = await Document.find(req.query);
        // ...and returns the data
        res.json(doc);
      } catch(error) {
        console.log(error);
      }
    })
    
    // handler for creating books...
    .post(async function (req, res) {
      try {
        // ...creates a document...
        let document = new Document({
          title: req.body.title
        });
        // ...saves it in the database...
        const doc = await document.save();
        // ...returns data...
        res.json(doc);
      } catch (error) {
        console.log(error);
      }
    })
    
    // handler for deleting books...
    .delete(async function(req, res){
      try {
        // ...finds and deletes requested document in database...
        let doc = await Document.findByIdAndDelete(req.body._id, req.body);
        // ...checks if document is found...
        if (!doc) throw 'invalid id';
        // ...returns message...
        res.json( { result: 'successfully deleted', '_id': doc._id } );
      } catch(error) {
        // ...or error message
        if (error.name == 'CastError') {
          res.json({ error: "missing _id" });
        } else if (error == 'invalid id') {
          res.json({ error: "could not delete", "_id": req.body._id });
        } else {
        console.log(error);
      }
    }
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
