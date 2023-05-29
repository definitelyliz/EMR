var Patient = require('../model/patient');
var User = require('../model/user');

const controllerHome = {
    goHome: async (req, res) => {
        if (req.session.username) {
            let patients = await Patient.find({}).sort({ 'date': -1 });
            res.render('home/homepage', { patients });
        }
        else {
            console.log('Login to proceed.');
            var message = false
            res.render('user/login', { message });
        }
    }
}

module.exports = controllerHome;