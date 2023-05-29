var User = require('../model/user');
var Patient = require('../model/patient');
var Consultation = require('../model/consultation')
var types = ['Surgical', 'Purely Medical', 'Checkup'];
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/${file.originalname}.${ext}`);
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
};

//Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});


const controllerConsultation = {

    //Get page to create a new consultation in the DB
    createConsultation: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;
            res.render('consultation/addConsultation', { patientId });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Post the new consultation data into the DB
    addConsultation: async (req, res) => {
        if (req.session.username) {
            const { patientId } = req.params;
            var data = req.body;

            console.log(req.body.plandescription)

            var planData = [];

            var multipleData = Array.isArray(req.body.category);

            if (multipleData) {
                for (let i = 0; i < req.body.plandescription.length; i++) {
                    tempData = { category: req.body.category[i], description: req.body.plandescription[i] };
                    planData.push(tempData);
                }
            }
            else {
                tempData = { category: req.body.category, description: req.body.plandescription };
                planData.push(tempData);
            }

            data.patientID = patientId;
            data.date = req.body.date;
            if (!data.date) {
                data.date = Date.now();
            }
            var newData = new Consultation(data);
            for (let i = 0; i < planData.length; i++) {
                newData.plan.push(planData[i]);
                console.log(planData[i]);
            }

            await newData.save()
                .then(async () => {
                    res.redirect(`/patient/${patientId}`);
                })
                .catch((err) => {
                    console.log(err)
                    message = err;
                    res.redirect(`/patient/${patientId}/newConsultation`);
                })

        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Get edit consultation page

    editConsultationPage: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;
            const consultationId = req.params.consultationId;

            var currConsult = await Consultation.findOne({ patientID: patientId, _id: consultationId })
            res.render('consultation/editConsultation', { patientId, currConsult });
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Edit consultation data on db
    editConsultation: async (req, res) => {
        if (req.session.username) {
            const { consultationId } = req.params;
            console.log(req.params.patientId);
            const data = req.body;
            // asdka
            console.log(req.body.plandescription)
            console.log(req.body.category)

            var planData = [];

            var multipleData = Array.isArray(req.body.plandescription);

            if (multipleData) {
                for (let i = 0; i < req.body.plandescription.length; i++) {
                    tempData = { category: req.body.category[i], description: req.body.plandescription[i] };
                    planData.push(tempData);
                }
            }
            else {
                tempData = { category: req.body.category, description: req.body.plandescription };
                planData.push(tempData);
            }

            // data.patientID = patientId;
            data.date = req.body.date;
            if (!data.date) {
                data.date = Date.now();
            }

            var newData = new Consultation(data);
            for (let i = 0; i < planData.length; i++) {
                newData.plan.push(planData[i]);
                console.log(planData[i]);
            }
            // ksjdhf   



            var { date, subjective, assessment, objective } = data;

            if (subjective == undefined) {
                subjective = "";
            }
            if (assessment == undefined) {
                assessment = "";
            }
            if (objective == undefined) {
                objective = "";
            }

            var newplan = newData.plan
            console.log(`New subjective: ${subjective}`)
            // await Consultation.findByIdAndUpdate(consultationId, { date, subjective, assessment, objective, newplan })
            await Consultation.findByIdAndUpdate(consultationId,
                { date, subjective, assessment, objective, plan: newplan }
            );
            res.redirect(`/patient/${req.params.patientId}`);
        }
        else {
            message = 'Login to proceed.';
            console.log('Login to proceed.');
            res.redirect('/user/login');
        }
    },

    //Get delete consultation

    deleteConsultation: async (req, res) => {
        if (req.session.username) {
            const patientId = req.params.patientId;
            const consultationId = req.params.consultationId;

            Consultation.findByIdAndRemove({ patientID: patientId, _id: consultationId }, function (err) {
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

    uploadFile: async (req, res) => {
        // Stuff to be added later
        // console.log(req.file)

        try {
            const { consultationId } = req.params;
            const { patientId } = req.params;
            var currConsult = await Consultation.findOne({ _id: consultationId });
            const newFile = req.body;
            newFile.name = req.file.filename;
            newFile.title = req.body.title;

            currConsult.file.push(newFile);
            await currConsult.save();

            res.status(200).redirect(`/patient/${patientId}`);
        } catch (error) {
            res.json({
                error,
            })
            console.log(error);
        }
    },

    deleteFile: async (req, res) => {
        if (req.session.username) {
            const { consultationId } = req.params;
            const { fileId } = req.params;
            var fileName;
            var currentConsultation = await Consultation.findById(consultationId)
                .then(async (currentConsultation, fileName) => {

                    for (let file of currentConsultation.file) {
                        if (file._id == fileId) {
                            fileName = file.name;
                        }
                    }

                    var directoryPath = "./public/";

                    fs.unlink(directoryPath + fileName, async (err) => {
                        if (err) {
                            res.status(500).send({
                                message: "Could not delete the file. " + err,
                            });
                        }

                        await currentConsultation.file.pull({ _id: fileId });
                        await currentConsultation.save();
                        res.redirect(`/patient/${currentConsultation.patientID}`);
                    });


                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}

module.exports = controllerConsultation;
