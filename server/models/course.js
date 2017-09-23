const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqid = require('uniqid');

// Define our model
const courseSchema = new Schema({
    title: { type: String },
    id: {type: String, uniq: true},
    description: String,
    imgPath: String,
    category: {type:Array}
});

// On Save Hook, generate unique id
// Before saving a model, run this function
courseSchema.pre('save', function(next) {

    const course = this;
    course.id = uniqid();
    next()
});


// Create the model class
const ModelClass = mongoose.model('course', courseSchema);

// Export the model
module.exports = ModelClass;
