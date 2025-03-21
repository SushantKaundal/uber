const UserModel = require('../models/user.model');


async function createUser({ firstName, lastName, email, password }) {

    try {
        const response = await UserModel.create({ firstName, lastName, email, password });
        return response;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('User creation failed. Please try again later.');
    }
}

async function findUserByEmail(email) {
    try {
        const user = await UserModel.findOne({
            email
        }).select('+password');
        return user;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Error finding user by email. Please try again later.');
    }

}

module.exports = { createUser,findUserByEmail };
