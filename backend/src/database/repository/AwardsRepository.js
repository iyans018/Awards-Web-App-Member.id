const { AwardsModel } = require("../models");

class AwardsRepository {
    async createAwards({ name, poin, type, imageUrl }) {
        try {
            const awards = new AwardsModel({ name, poin, type, imageUrl });

            return await awards.save();
        } catch (error) {
            throw new Error("Repository cannot create Awards");
        }
    }

    // hp = high poin, lp = low poin
    async listAwards({ startIndex, limit, lp, hp, type }) {
        try {
            let aggregate = [{ $skip: startIndex }, { $limit: limit }, { $sort: { createdAt: -1 } }];
            
            const matchPoin = { poin: { $gte: lp, $lte: hp } };
            const matchType = { type: { $in: type } };

            const queryMatch = { $match: { $and: [ matchPoin, matchType ] } };

            if (lp && hp) aggregate.unshift({ $match: matchPoin });
            if (type) aggregate.unshift({ $match: matchType });
            if ((lp && hp) && type) aggregate.unshift(queryMatch);

            return await AwardsModel.aggregate(aggregate);
        } catch (error) {
            throw new Error("Repository cannot get list Awards");
        }
    }

    async listAllAwards({ lp, hp, type }) {
        try {   
            let query;

            const queryPoin = { poin: { $gte: lp, $lte: hp } };
            const queryType = { type: { $in: type } };

            if (lp && hp) query = queryPoin;
            if (type) query = queryType;
            if ((lp && hp) && type) query = { ...queryPoin, ...queryType }

            return await AwardsModel.find(query);
        } catch (error) {
            console.log(error);
            throw new Error("Repository cannot get list Awards");
        }
    }
}

module.exports = AwardsRepository;