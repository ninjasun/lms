const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define our model
const courseSchema = new Schema({
    title: { type: String },
    id: {type: String, uniq: true},
    description: String,
    imgPath: String,
    category: {type:Array}
});



// Create the model class
const ModelClass = mongoose.model('course', courseSchema);

// Export the model
module.exports = ModelClass;
