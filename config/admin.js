const AdminBroExpressjs = require('admin-bro-expressjs');
const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

const UserModel = require('../models/users.model');
const ServiceModel = require('../models/services.model');
const ReviewModel = require('../models/reviews.model');

const adminBro = new AdminBro({
    resources: [
        UserModel,
        ServiceModel,
        ReviewModel,
    ],
    branding: {
        companyName: 'StayCation',
        softwareBrothers: false
    },
    rootPath: '/admin',
});
exports.adminBro;

exports.router = AdminBroExpressjs.buildRouter(adminBro)