const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    patientID: {
        type: String,
        required: true
    },
    subjective: [
        String
    ],
    assessment: [
        {
            type: String,
            index: true
        }
    ],
    objective: [
        String
    ],
    plan: [
        {
            description: {
                type: String,
                required: true,
                index: true
            },
            category: {
                type: String,
                enum: ['Medications', 'Laboratory', 'Others'],
                required: true
            },
        }
    ],
    date: {
        type: Date,
        required: true
    },
    file: [
        {
            createdAt: {
                type: Date,
                default: Date.now,
            },
            name: {
                type: String,
                required: [true, "Uploaded file must have a name"],
            },
            title: {
                type: String,
                required: true
            }
        }
    ]
})

consultationSchema.methods.formatDate = function (dateProperty) {

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


consultationSchema.index({ assessment: 'text', "plan.description": 'text' });
const Consultation = mongoose.model('Consultation', consultationSchema);
Consultation.createIndexes();
module.exports = Consultation;