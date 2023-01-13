const e = require('express');
const session = require('express-session');
const Offer = require('../db/models/offer');

class OfferController {

    async showOffers(req, res) {

        const where = req.params;
        const query = Offer.find(where)
        const offers = await query.exec();
        const search_params = where

        console.log(offers.from_date);

        console.log(offers)
        console.log(req.params)
        
        res.render('pages/offers/offers', {
            offers,
            search_params
        });

    }

    async showOffer(req, res) {
        console.log(req.params)
        const offer = await Offer.findOne({ 
            country_slug: req.params.country_slug,
            region_slug: req.params.region_slug,
            city_slug: req.params.city_slug,
            slug: req.params.slug,   });

        res.render('pages/offers/offer', {
            offer,
        });

    }

    showCreateOfferForm(req, res) {
        res.render('pages/offers/create');
    }

    async createOffer (req, res) {
        const code = 'WAK' + Math.floor(Math.random() * (99999 - 9999 + 1) + 9999);
        const offer = new Offer({
            name: req.body.name,
            description: req.body.description,
            offer_code: code,
            country: req.body.country,
            region: req.body.region,
            city: req.body.city,
            country_slug: req.body.country,
            region_slug: req.body.region,
            city_slug: req.body.city,
            from_date: req.body.from_date,
            to_date: req.body.to_date,
            price: req.body.price,
            image: req.file.filename,
        }); 

        try {
            await offer.save();
            res.redirect('/oferty');

        } catch (e) {
            //
            console.log(e);

            res.render('pages/offers/create', {
                errors: e.errors,
                form: req.body

            });
        }
    }

};

module.exports = new OfferController();