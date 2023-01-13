const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { validateEmail } = require('../validators');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: [true, 'Ten adres e-mail jest już zajęty'],
        validate: [validateEmail, 'Email nieprawidłowy']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Hasło powinno posiadać min. 4 znaki']
    },
    firstName: String,
    lastName: String,
});

/// hashowanie hasła użytkownika przed zapisem do DB


userSchema.pre('save', function(next) {
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
});

/// jesli juz istnieje user o takim adresie e-mail zwraca bład

userSchema.post('save', function(error, doc, next) {

    if (error.code === 11000) {
        error.errors = { email: { message: 'Taki email już istnieje' }};
    }

    next(error);


});


/// sprawdzanie hasla

userSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}



/// Pola wirtualne, np. mozna dodać dwa wyniki z bazy i je uzywac potem jako zmienna, w tym wypadku zmienna fullName wyswietla nam zmienna firstName i lastName

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`

});

const User = mongoose.model('User', userSchema);


module.exports = User;