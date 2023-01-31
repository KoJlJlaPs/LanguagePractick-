const { User } = require('../models/User');
module.exports = async (req, res, next) => {
    const decodedTokenData = req.tokenData;
    console.log(decodedTokenData);
    if(!decodedTokenData) return res.status(401).send({error:'No authorization token was found'});
    const userRecord = await new User().getUser(decodedTokenData._id);

    req.currentUser = userRecord;

    if (!userRecord) return res.status(401).send({message:'User not found'});
    else return next();
};
