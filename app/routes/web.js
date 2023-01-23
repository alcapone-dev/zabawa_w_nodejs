const express = require('express');
const router = new express.Router();

const CompanyController = require('../controllers/company-controller');
const PageController = require('../controllers/page-controller');
const UserController = require('../controllers/user-controller');
const OfferController = require('../controllers/offer-controller');
const TweetController = require('../controllers/tweet-controller');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});

const upload = multer({ storage });


router.get('/oferty', OfferController.showOffers);
router.get('/oferty/:country_slug', OfferController.showOffers);
router.get('/oferty/:country_slug/:region_slug', OfferController.showOffers);
router.get('/oferty/:country_slug/:region_slug/:city_slug', OfferController.showOffers);
router.get('/oferty/:country_slug/:region_slug/:city_slug/:slug', OfferController.showOffer);

router.get('/admin/oferty/dodaj', OfferController.showCreateOfferForm);
router.post('/admin/oferty/dodaj', upload.single('image'), OfferController.createOffer);

router.get('/tweets', TweetController.showTweets);
router.post('/tweets', TweetController.postTweet);

router.get('/tweets/:_id', TweetController.showTweet);
router.post('/tweets/:_id', TweetController.postTweetAnswer);


router.get('/', PageController.showHome);
router.get('/firmy', CompanyController.showCompanies);
router.get('/firmy/:name', CompanyController.showCompany);

router.get('/zarejestruj', UserController.showRegister);
router.post('/zarejestruj', UserController.register);
router.get('/zaloguj', UserController.showLogin);
router.post('/zaloguj', UserController.login);
router.get('/wyloguj', UserController.logout);

router.get('/admin/profil', UserController.showProfile);
router.post('/admin/profil', UserController.update);

router.get('/admin/firmy/dodaj', CompanyController.showCreateCompanyForm);
router.post('/admin/firmy/dodaj', CompanyController.createCompany);
router.get('/admin/firmy/:name/edytuj', CompanyController.showEditCompanyForm);
router.post('/admin/firmy/:name/edytuj', upload.single('image'), CompanyController.editCompany);
router.get('/admin/firmy/:name/usun', CompanyController.deleteCompany);

router.get('*', PageController.showNotFound);




module.exports = router;