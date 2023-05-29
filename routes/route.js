const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");

const controllerUser = require('../controller/controlleruser.js');
const controllerPatient = require('../controller/controllerpatient.js');
const controllerHome = require('../controller/controllerhome.js');
const controllerConsultation = require('../controller/controllerconsultation.js');


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
    if (file.mimetype.split("/")[1] === "pdf" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "mp4") {
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

//Home page section
app.get('/', controllerHome.goHome);
//app.get('/about', controllerhome.goAbout)

//Login and signup section
app.get('/user/login', controllerUser.login);
app.post('/user', controllerUser.checkLogin);
app.get('/user/signup', controllerUser.signup);
app.post('/user/signup', controllerUser.addUser);
app.get('/user/:username', controllerUser.userPage);
app.get('/logout', controllerUser.logout);
app.get('/user/:username/edit', controllerUser.editUser);
app.post('/user/updateProfile', controllerUser.updateUser);
// app.get('/user/relogin', controllerUser.relogin);

//Records section
app.get('/patient/new', controllerPatient.createPatient);
app.post('/patient', controllerPatient.addPatient);
app.get('/patient/:patientId', controllerPatient.viewPatient);
app.get('/patients/search', controllerPatient.searchPatients);
app.get('/patients/patient/:patientId', controllerPatient.viewPatient); // view patient record after search
app.get('/patient/edit/:patientId', controllerPatient.editPatient);
app.post('/patient/modify/:patientId', controllerPatient.modifyPatient);
app.get('/patient/delete/:patientId', controllerPatient.deletePatient);

//Consultation
app.get('/patient/:patientId/newConsultation', controllerConsultation.createConsultation);
app.post('/patient/:patientId', controllerConsultation.addConsultation);
app.get('/patient/:patientId/editConsultation/:consultationId', controllerConsultation.editConsultationPage);
app.patch('/patient/:patientId/editConsultation/:consultationId', controllerConsultation.editConsultation);
app.get('/patient/:patientId/deleteConsultation/:consultationId', controllerConsultation.deleteConsultation);
app.post('/patient/:patientId/newFile/:consultationId', upload.single("myFile"), controllerConsultation.uploadFile);
app.delete('/delete_file/:consultationId/:fileId', controllerConsultation.deleteFile);


module.exports = app;