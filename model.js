// This file defines data used in the app

// Mount database framework
const mongoose = require('mongoose')

// Connect and set up database
mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Get notified if database connects successfully or not
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to database');
});

// Define schema (constructor) for MongoDB documents
const schema = new mongoose.Schema({
  comments: {
    type: Array,
    required: [true, 'missing field']
  },
  title: {
    type: String,
    required: [true, 'missing field']
  },
  commentcount: {
    type: Number,
    default: 0
  },
});

// Define model (class) for MongoDB documents
const Document = mongoose.model("Collection", schema);

// Make model available from controller.js
module.exports = Document;