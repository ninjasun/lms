const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const Courses = require('./controllers/courses');
const Assignment = require('./controllers/assignment');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, Courses.getAll);
  app.post('/courses', requireAuth, Courses.addCourse);

    app.get('/assignment', requireAuth, Assignment.getAll);
    app.post('/assignment', requireAuth, Assignment.addAssignment);

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
