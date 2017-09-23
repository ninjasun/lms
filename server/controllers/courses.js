const jwt = require('jwt-simple');
const Course = require('../models/course');
const config = require('../config');

const uniqid = require('uniqid');


exports.getAll = function(req, res, next) {
    // User has auth
    // We just need to give them all the courses
    console.log("API CALL -- GETALL -- ")
    Course.find(function (err, result ) {

        if(err){ return res.status(422).send({error: 'There was an error'})}
        console.log("RESULT is:  ", result)
        res.send({ coursesList: result})

    });
};

exports.addCourse = function(req, res, next) {
    console.log("API CALL -- ADDCOURSE -- ")
    const title = req.body.title; //required
    const id =   uniqid(); //required
    const description = req.body.description; //required
    const imgPath = req.body.imgPath; //required
    const categories = req.body.categories; //required
    console.log("parse category need to be an array of string. ", categories);

    /*TO DO check parameters */
    const course = new Course({
            title: title,
            id: id,
            description: description,
            imgPath: imgPath,
            categories: categories
        });

    course.save(function(err) {
        if (err) { return next(err); }

        // Repond to request indicating the course was created
        res.json({ id:course.id  });
    });
}
