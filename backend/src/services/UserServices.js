const { UserRepository } = require("../database/repository");
const { formatData, signJWT } = require("../utils");
const { CREATED, BAD_REQUEST, OK } = require("../utils/status-codes");
const { validateUser, validateLogin } = require("../utils/validation");

class UserServices {
    constructor() {
        this.repository = new UserRepository();
    }

    async createUser(inputUser) {
        const { email, fullName } = inputUser;
        const { error } = validateUser(inputUser);

        if (error) return formatData(BAD_REQUEST, null, error.details[0].message);

        try {
            const existingUser = await this.repository.readUser({ email });
            if (existingUser) { return formatData(BAD_REQUEST, null, "User is already registered"); }

            const createdUser = await this.repository.createUser({ email, fullName });

            return formatData(CREATED, createdUser, "Success create user");
        } catch (error) {
            throw new Error("Service cannot create user")
        }
    }

    async login(inputUser) {
        const { email } = inputUser;
        const { error } = validateLogin(inputUser);

        if (error) return formatData(BAD_REQUEST, null, error.details[0].message);

        try {
            const existingUser = await this.repository.readUser({ email });

            if (!existingUser) { return formatData(BAD_REQUEST, null, "Email Address is not exits"); }

            const accessToken = signJWT({
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            });

            return formatData(OK, { accessToken }, "Login success");
        } catch (error) {
            throw new Error("Service cannot login");
        }
    }
}

module.exports = UserServices;