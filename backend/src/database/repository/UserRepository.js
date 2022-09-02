const { UserModel } = require("../models");

class UserRepository {
    async createUser({ email, fullName }) {
        try {
            const user = new UserModel({ email, fullName });

            return await user.save();
        } catch (error) {
            throw new Error('Repository cannot create user');
        }
    }

    // Untuk mencari user dengan email atau id
    async readUser({ id, email }) {
        try {
            return await UserModel.findOne({ $or: [ { _id: id }, { email } ] });
        } catch (error) {
            throw new Error('Repository cannot read user');
        }
    }
}

module.exports = UserRepository;