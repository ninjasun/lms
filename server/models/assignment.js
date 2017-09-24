const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define our model
const assignmentSchema = new Schema({
    users: Array,
    courses:Array,
    title:String,
    id:{ type: String, unique:true},
    description:String
});



// Create the model class
const ModelClass = mongoose.model('assignment', assignmentSchema);

// Export the model
module.exports = ModelClass;
