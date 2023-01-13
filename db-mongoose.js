const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = 'mongodb://127.0.0.1:27017/node-kurs';
mongoose.set('strictQuery', true);


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const companySchema = new Schema({
    slug: {
        type: String,
        required: true,
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
});



const Company = mongoose.model('Company', companySchema);


Company.find({}, (err, docs) => {
    console.log(docs)
});