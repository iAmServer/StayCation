const ServiceModel = require('../models/services.model');
const ReviewModel = require('../models/reviews.model');

exports.loadAll = async (req, res) => {
    const services = await ServiceModel.find();
    const user = req.user ? req.user : null
    res.render('services', {title: 'Services - Staycation', services, user})
}

exports.loadOne = async (req, res) => {
    const { services } = req.params;
    const user = req.user ? req.user : null
    const service = await ServiceModel.findOne({ _id: services });
    let rates = 0;
    let rate = 0;
    const reviews = await ReviewModel.find({ service: service._id });
    if (reviews) {
        const total = Object.keys(reviews).length;
        for (t of reviews) {
            rate += t.rate;
        }
        rates = rate / total; 
    }
    res.render('review', { title: 'Services - Staycation', service , review: rates, user})
}