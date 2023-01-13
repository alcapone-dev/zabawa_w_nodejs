const mongoose = require('mongoose');
const { nextTick } = require('process');
const slugify = require('slugify');
const Schema = mongoose.Schema;



const offerSchema = new Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    offer_code: {
        type: String,
    },

    //OPIS OFERTY
    description: {
        type: String,
    },

    /// LOKALIZACJA
    country_slug: {
        type: String,
    },
    region_slug: {
        type: String,
    },
    city_slug: {
        type: String,
    },
    country: {
        type: String,
        lowercase: true,
    },
    region: {
        type: String,
        lowercase: true,
    },
    city: {
        type: String,
        lowercase: true,
    },

    // DATA OD DO
    from_date: {
        type: Date,
    },
    to_date: {
        type: Date,
    },

    // CENA
    price: {
        type: Number,
    },

    image: {
        type: String,
    }


});

offerSchema.methods.formatDate = function(datePropery) {
    const newDate = new Date(this[dateProperty]);
    let formattedDate = `${ newDate.getFullYear() }-`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
        formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`;        // for double digit day
    return formattedDate;
}

offerSchema.pre('validate', function(next) {
    const random_id = '-' + Math.floor(Math.random() * (99999 - 9999 + 1) + 9999);
    if(this.name) {
        this.slug = slugify(this.name + random_id, { lower: true, strict: true})
    }
    if(this.country_slug) {
        this.country_slug = slugify(this.country_slug, { lower: true, strict: true})
    }
    if(this.region_slug) {
        this.region_slug = slugify(this.region_slug, { lower: true, strict: true})
    }
    if(this.city_slug) {
        this.city_slug = slugify(this.city_slug, { lower: true, strict: true})
    }
    next();

});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;