const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define our model
const courseSchema = new Schema({
    id: { type: String, unique: true, lowercase: true },
    title: String,
    description: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function


// Create the model class
const ModelClass = mongoose.model('course', courseSchema);

// Export the model
module.exports = ModelClass;