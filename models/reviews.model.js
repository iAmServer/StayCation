const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    message: { type: String },
    rate: { type: Number, required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Services', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
}, {
    timestamps: true
});

reviewsSchema.set('toJSON', {
    virtuals: true
})

const Service = mongoose.model('Reviews', reviewsSchema);
module.exports = Service;