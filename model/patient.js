const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        index: true
    },
    middleName: {
        type: String,
        required: true,
        index: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
        index: true
    },
    address: {
        type: String
    },
    contactNumber: {
        type: String,
    },
    birthday: {
        type: Date,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    referral: {
        type: String,

    }
})

patientSchema.methods.formatDate = function (dateProperty) {

    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November",
        "December"
    ]

    const newDate = new Date(dateProperty);
    var day = monthNames[newDate.getMonth()];
    let formattedDate = `${day} `;  // for double digit month
    formattedDate += `${`${newDate.getDate()}`}, `;        // for double digit day
    formattedDate += `${newDate.getFullYear()}`;
    return formattedDate;
}

patientSchema.index({ lastName: 'text', firstName: 'text', type: 'text' })
const Patient = mongoose.model('Patient', patientSchema);
Patient.createIndexes();

module.exports = Patient;