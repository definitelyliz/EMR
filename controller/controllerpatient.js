var User = require('../model/user');
var Patient = require('../model/patient');
var Consultation = require('../model/consultation');
var types = ['Surgical', 'Purely Medical', 'Checkup'];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const controllerPatient = {

    //Get page to create a new patient in the DB
    createPatient: async (req, res) => {
        if (req.session.username) {
            res.render('patient/newPatient', { types });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Post the new patient data into the DB
    addPatient: async (req, res) => {
        if (req.session.username) {
            var data = req.body;
            data.creator = req.session.username;
            data.firstName = capitalizeFirstLetter(data.firstName)
            data.lastName = capitalizeFirstLetter(data.lastName)
            data.middleName = capitalizeFirstLetter(data.middleName)

            var newData = new Patient(data);
            await newData.save()
                .then(async () => {
                    res.redirect('/');
                })
                .catch((err) => {
                    message = err;
                    res.redirect('/patient/new');
                })



        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },


    editPatient: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;

            Patient.find({ _id: patientId }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('patient/editPatient', {
                        patient: result[0],
                        types
                    });
                }
            });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Post the modified patient data into the DB
    modifyPatient: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;

            const query = { _id: patientId };
            // const title = req.body.postTitle;
            // const content = req.body.postBody;
            Patient.updateOne(query,
                {
                    lastName: capitalizeFirstLetter(req.body.lastName),
                    firstName: capitalizeFirstLetter(req.body.firstName),
                    middleName: capitalizeFirstLetter(req.body.middleName),
                    gender: req.body.gender,
                    address: req.body.address,
                    contactNumber: req.body.contactNumber,
                    birthday: req.body.birthday,
                    occupation: req.body.occupation,
                    referral: req.body.referral
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/patient/${patientId}`);
                    }
                });

        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    viewPatient: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;

            var consultations = await Consultation.find({ patientID: patientId }).sort({ 'date': -1 });


            // res.render('patient/patientRecord', { types });
            Patient.find({ _id: patientId }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('patient/patientRecord', {
                        patient: result[0], consultations
                    });
                }
            });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },


    searchPatients: async (req, res) => {
        if (req.session.username) {
            var { q } = req.query;


            var idArr = [];

            var searchConsultation = await Consultation.find({ $text: { $search: q } });
            console.log(searchConsultation);

            if (Array.isArray(searchConsultation)) {
                for (let i = 0; i < searchConsultation.length; i++) {
                    idArr.push(searchConsultation[i].patientID);
                }
            };

            var searchPatients = await Patient.find({
                '_id': {
                    $in: idArr
                }
            });

            if (idArr.length == 0) {
                searchPatients = await Patient.find({ $text: { $search: q } }).sort({ 'date': -1 });
            };

            console.log(searchPatients);
            res.render('patient/searchPatient', { q, searchPatients });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    deletePatient: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;

            Patient.findByIdAndRemove(patientId, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Consultation.deleteMany({ patientID: patientId }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/");
                        }
                    });
                }
            });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },
}

module.exports = controllerPatient;
