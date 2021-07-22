const { Users } = require('../../models');

module.exports = async (req, res) => {

    const userInfo = await Users.findAll();
    const userArr = userInfo.map(el => {
        return el.dataValues;
    });

    res.status(200).json(userArr);
};