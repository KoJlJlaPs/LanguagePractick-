const { User } = require('../models/User');
module.exports = async (req, res, next) => {
    const decodedTokenData = req.tokenData;
    const userRecord = await new User().findOneByEmail({ _id: decodedTokenData._id });

    req.currentUser = userRecord;

    if (!userRecord) return res.status(401).end('User not found');
    else return next();
};
