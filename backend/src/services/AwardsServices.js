const { AwardsRepository } = require("../database/repository");
const { formatData } = require("../utils");
const { OK, CREATED, BAD_REQUEST } = require("../utils/status-codes");
const { validateAwards } = require("../utils/validation");

class AwardsServices {
    constructor() {
        this.repository = new AwardsRepository();
    }

    async createAwards(inputUser) {
        const { name, poin, type, imageUrl } = inputUser;
        const { error } = validateAwards(inputUser);

        if (error) return formatData(BAD_REQUEST, null, error.details[0].message);

        try {
            const createdAwards = await this.repository.createAwards({ name, poin, type, imageUrl });

            return formatData(CREATED, createdAwards, "Success create Awards");
        } catch (error) {
            throw new Error ("Service cannot create Awards");
        }
    }

    async listAwards(query) {
        try {
            let type = [];

            if (Array.isArray(query.type)) {
                query.type.map(item => type.push(item));
            } else if (typeof query.type === 'string') {
                type.push(query.type)
            } else {
                type = query.type
            }

            const listQuery = {
                page: parseInt(query.page) || 1,
                limit: parseInt(query.limit) || 5,
                type,
                lp: parseInt(query.lp),
                hp: parseInt(query.hp)
            }

            const startIndex = (listQuery.page - 1) * listQuery.limit;

            const listAllAwards = await this.repository.listAllAwards({
                lp: listQuery.lp,
                hp: listQuery.hp,
                type: listQuery.type
            });
            const listAwards = await this.repository.listAwards({
                startIndex,
                limit: listQuery.limit,
                lp: listQuery.lp,
                hp: listQuery.hp,
                type: listQuery.type
            });

            const resultData = {
                totalItems: listAllAwards.length,
                awards: listAwards,
                totalPages: (Math.ceil(listAllAwards.length / listQuery.limit)),
                currentPage: listQuery.page,
            }

            return formatData(OK, resultData, "Success get list Awards");
        } catch (error) {
            console.log(error);
            throw new Error("Service cannot get list Awards")
        }
    }
}

module.exports = AwardsServices;