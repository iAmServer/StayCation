const ReviewModel = require('../models/reviews.model');

exports.add = async (req, res) => {
    const user = req.user ? req.user : null
    const { service, rate, message } = req.body;
    const review = new ReviewModel({
        service,
        user,
        rate,
        message
    });
    await review.save();
    res.redirect('/service');
}

exports.loadAdd = (req, res) => {
    const user = req.user ? req.user : null
    const { serviceID } = req.params;
    console.log(serviceID);

    res.render('review', { title: 'Add Review - Staycation', user});
}