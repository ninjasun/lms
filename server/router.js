const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ coursesList: [
            {"id":"001", "title":"React beginner", "description":"This a introduction course about React"},
            {"id":"002", "title":"React advanced", "description":"This a introduction course about React"},
            {"id":"003", "title":"Redux beginner", "description":"This a introduction course about React"},
            {"id":"003", "title":"Redux beginner", "description":"This a introduction course about React"},
            {"id":"004", "title":"Redux advanced", "description":"This a introduction course about React"},
            {"id":"005", "title":"ES6 beginner", "description":"This a introduction course about React"},
            {"id":"006", "title":"ES6 advanced", "description":"This a introduction course about React"},
        ] });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}