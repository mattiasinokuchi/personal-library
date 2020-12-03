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

    // handler for POST request of a book...
    .post(async function (req, res) {
      try {
        // ...creates a document...
        let document = new Document({
          title: req.body.title
        });
        // ...saves it in the database...
        const doc = await document.save();
        // ...returns data...
        res.json({
          _id: doc._id,
          title: doc.title
        });
      } catch (error) {
        // ...or sends error message
        if (error.name == 'ValidationError') {
          res.send("missing required field title");
        } else {
          console.log(error);
        }
      }
    })
    
    // handler for GET request to all books...
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

    // handler for GET request of a book...
    .get(async function (req, res) {
      try {
        // ...finds requested documents in      database...
        let doc = await Document.findById(req.params.id);
        // ...and returns the data...
        res.json({
          comments: doc.comments,
          _id: doc._id,
          title: doc.title,
          commentcount: doc.commentcount,
          __v: doc.__v
        });
      } catch(error) {
        // ..or returns a error message
        if (error.name == 'CastError') {
          res.send('no book exists');
        } else {
          console.log(error);
        }
      }
    })
    
    // handler for POST request of a comment...
    .post(async function(req, res) {
      try {
        // ...finds a document...
        let doc = await Document.findById(req.params.id);
        console.log('doc: ', doc);
        // ...adds the comment...
        doc.comments.push(req.body.comment);
        // ...increments counter...
        doc.commentcount++;
        // ...saves the document...
        await doc.save();
        // ...returns data...
        res.json({
          comments: doc.comments,
          _id: doc._id,
          title: doc.title,
          commentcount: doc.commentcount,
          __v: doc.__v
        });
      } catch (error) {
        // ...or sends error message
        if (error.name == 'ValidationError') {
          res.send("missing required field title");
        } else {
          console.log(error);
        }
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
