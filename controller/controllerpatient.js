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
            data.bloodType = req.body.bloodType;

            console.log(req.body.subjective);

            var planData = [];

            var multipleData = Array.isArray(req.body.subjective);

            if (multipleData) {
                for (let i = 0; i < req.body.subjective.length; i++) {
                    tempData = req.body.subjective[i];
                    planData.push(tempData);
                }
            }
            else {
                tempData =  req.body.subjective;
                planData.push(tempData);
            }

            var newData = new Patient(data);
            for (let i = 0; i < planData.length; i++) {
                newData.medicalHistory.push(planData[i]);
                console.log(planData[i]);
            }


                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();

                todayDate = year + "-" + month + "-" + day;
            
            if(!isNaN(req.body.contactNumber) && req.body.birthday <= todayDate)
            {
                await newData.save()
                .then(async () => {
                    res.redirect('/');
                    console.log(newData);
                })
                .catch((err) => {
                    msg = err;
                    res.redirect('/patient/new');
                    console.log('bruh');         
                })
            }
                else{
                    //add indication to user the cause of error 
                    res.redirect('/patient/new');
                    console.log('bruh');
                }
            



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
          const currPatient = await Patient.findOne({ _id: patientId });
      
          Patient.find({ _id: patientId }, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              const subjective = currPatient.subjective || []; // Ensure subjective is an array
              const subjectiveArray = Array.isArray(subjective) ? subjective : [subjective]; // Convert to array if not already
              res.render('patient/editPatient', {
                currPatient: currPatient,
                patient: result[0],
                types,
                subjective: subjectiveArray // Pass subjective as an array to the template
              });
            }
          });
        } else {
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
                    referral: req.body.referral,
                    bloodType: req.body.bloodType,
                    medicalHistory: req.body.medicalHistory
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/patient/${patientId}`);
                        console.log(req.body.bloodType);
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