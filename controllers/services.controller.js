const ServiceModel = require('../models/services.model');

exports.loadAll = async (req, res) => {
    const services = await ServiceModel.find();
    const user = req.user ? req.user : null
    res.render('services', {title: 'Services - Staycation', services, user})
}

exports.loadOne = async (req, res) => {
    const { services } = req.params;
    const user = req.user ? req.user : null
    const service = await ServiceModel.findOne({_id: services});
    res.render('review', { title: 'Services - Staycation', service , user})
}