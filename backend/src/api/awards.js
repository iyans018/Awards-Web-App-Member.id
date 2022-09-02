const { AwardsServices } = require("../services");
const { responseAPI } = require("../utils");

module.exports = (app) => {
    const service = new AwardsServices();

    app.post('/api/v1/awards', async (req, res, next) => {
        try {
            const { status, data, message } = await service.createAwards(req.body);

            return responseAPI(res, status, data, message);
        } catch (error) {
            next(error);
        }
    });

    app.get("/api/v1/awards", async (req, res, next) => {
        try {
            const { status, data, message } = await service.listAwards(req.query);

            return responseAPI(res, status, data, message);
        } catch (error) {
            next(error);
        }
    });
}