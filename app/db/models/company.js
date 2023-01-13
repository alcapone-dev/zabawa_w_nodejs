const mongoose = require('mongoose');
// const { checkForbiddenString } = require('../validators');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    slug: {
        type: String,
        required: true,
        minLength: [3, 'Minimalna liczba znaków to 3'],
        trim: true,
        lowercase: true,
    },

    name: {
        type: String,
    },
    employeesCount: {
        type: Number,
        min: 1,
        default: 1,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    image: String,
});



const Company = mongoose.model('Company', companySchema);

module.exports = Company;