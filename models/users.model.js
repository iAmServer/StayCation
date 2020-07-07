const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true}
}, {
    timestamps: true
});

userSchema.set('toJSON', {
    virtuals: true
})

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;