const jwt = require('jwt-simple');
const Course = require('../models/course');
const config = require('../config');

const uniqid = require('uniqid');


exports.getAll = function(req, res, next) {
    // User has auth
    // We just need to give them all the courses

    Course.find(function (err, result ) {

        if(err){ return res.status(422).send({error: 'There was an error'})}

        res.send({ courses: result})

    });
};

exports.addCourse = function(req, res, next) {
    console.log("req is: ", req);
    const title = req.title;
    const id =   uniqid();
    const description = req.description;
    const imgPath = req.imgPath;
    const category = req.category;

    const course = new Course({
            title: title,
            id: id,
            description: description,
            imgPath: imgPath,
            category: category
        });

    course.save(function(err) {
        if (err) { return next(err); }

        // Repond to request indicating the course was created
        res.json({ id:course.id  });
    });
}
