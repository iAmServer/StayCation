const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    title: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true }
}, {
    timestamps: true
});

serviceSchema.set('toJSON', {
    virtuals: true
})

const Service = mongoose.model('Services', serviceSchema);
module.exports = Service;