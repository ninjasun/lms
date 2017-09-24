const jwt = require('jwt-simple');
const Assignment = require('../models/assignment');
const config = require('../config');

const uniqid = require('uniqid');


exports.getAll = function(req, res, next) {
    // User has auth
    // We just need to give them all the Assignments
    console.log("API CALL -- GETALL ASSIGNMENT-- ")
    Assignment.find(function (err, result ) {

        if(err){ return res.status(422).send({error: 'There was an error'})}
        console.log("RESULT is:  ", result)
        res.send({ AssignmentsList: result})

    });
};

exports.addAssignment = function(req, res, next) {
    console.log("API CALL -- ADD ASSIGNMENT -- ")
    const title = req.body.title; //required
    const id =   uniqid(); //required
    const description = req.body.description;  //required
    const users = req.body.users || [];
    const courses = req.body.courses || [];


    /*TO DO check parameters */
    const assignment = new Assignment({
        title: title,
        id: id,
        description: description,
        users:users,
        courses:courses
    });

    assignment.save(function(err) {
        if (err) { return next(err); }

        // Repond to request indicating the Assignment was created
        res.json({ id:assignment.id  });
    });
}
