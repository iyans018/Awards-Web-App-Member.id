const { UserServices } = require("../services");
const { responseAPI } = require("../utils");

module.exports = (app) => {
    const service = new UserServices();

    app.post('/api/v1/users', async (req, res, next) => {
        try {
            const { status, data, message } = await service.createUser(req.body);

            return responseAPI(res, status, data, message);
        } catch (error) {
            next(error);
        }
    });

    app.post('/api/v1/login', async (req, res, next) => {
        try {
            const { status, data, message } = await service.login(req.body);

            return responseAPI(res, status, data, message);
        } catch (error) {
            next(error);
        }
    })
}