const Company = require('../db/models/company');
const UserController = require('./user-controller');

class CompanyController {


    async showCompanies(req, res) {

        const { q, sort, countmin, countmax } = req.query;
        const page = req.query.page || 1;
        const perPage = 2;
        let companiesCount = await Company.count({ name: { $regex: q || '', $options: 'i' } });


        const where = {};

        // search
        if (q) { where.name = { $regex: q || '', $options: 'i' } };

        //filtrowanie
        if (countmin || countmax) {
            where.employeesCount = {};
            if (countmin) where.employeesCount.$gte = countmin;
            if (countmax) where.employeesCount.$lte = countmax;
        }

        
        let query = Company.find(where);

        // paginacja
        const resultsCount = await Company.find(where).count();
        const pagesCount = Math.ceil(resultsCount / perPage);


        // paginacja

        query = query.skip((page - 1) * perPage);
        query = query.limit(perPage);

        // sortowanie
        if (sort) {
            const s = sort.split('|');
            query = query.sort({ [s[0]]: s[1] });
        }


        // pobranie wyników

        const companies = await query.populate('user').exec();



        // render strony

        res.render('pages/companies/companies', {
            companies,
            page,
            pagesCount,
            resultsCount,
            companiesCount
        })

    }


    // pokazywanie konkretnej firmy
    
    async showCompany(req, res) {
        const { name } = req.params;
    
        const company = await Company.findOne({ slug: name });
    
            res.render('pages/companies/company', { 
                name: company?.name, 
                employeesCount: company?.employeesCount,
                title: company?.name ?? 'Brak wyniku',
            });
    
    }

    showCreateCompanyForm(req, res) {
        res.render('pages/companies/create');
    }


    // tworzenie firmy

    async createCompany(req, res) {

        const company = new Company({
            name: req.body.name,
            slug: req.body.slug,
            employeesCount: req.body.employeesCount || undefined,
            user: req.session.user._id,
        });

        console.log(req.body.name);
        console.log(req.body.slug);
        console.log(req.body.employeesCount);



        try {
            await company.save();
            res.redirect('/firmy');
        } catch (e) {


            console.log(e);

            res.render('pages/companies/create', {
                errors: e.errors,
                form: req.body

            });

        }

    }

    async showEditCompanyForm(req, res) {

        const { name } = req.params;
        const company = await Company.findOne({ slug: name });
        const currentUserId = req.session.user._id;

        if(company.user == currentUserId) {  
            res.render('pages/companies/edit', {
                form: company,
            });
        } else {
            res.redirect('/firmy');
        }

    }

    async editCompany(req, res) {

        const { name } = req.params;
        const company = await Company.findOne({ slug: name });
        company.name = req.body.name;
        company.slug = req.body.slug;
        company.employeesCount = req.body.employeesCount;
        company.image = req.file.filename;


        try {
            await company.save();
            res.redirect('/firmy');
        } catch (e) {

            res.render('pages/companies/edit', {
                errors: e.errors,
                form: req.body

            });

        }

    }

    async deleteCompany(req, res) {

        const { name } = req.params;

        try {

            await Company.deleteOne({ slug: name }) 
            res.redirect('/firmy');

        } catch (e) {

            ///

        }

    }
}


module.exports = new CompanyController();