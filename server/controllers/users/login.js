require("dotenv").config();
const { Users } = require('../../models');
const { sign } = require('jsonwebtoken');

module.exports = async (req, res) => {

    if (req.body.username) {

        const userName = await Users.findOne({
            where: { username: req.body.username }
        });

        const userPassword = await Users.findOne({
            where: { password: req.body.password }
        });

        if (userName && !userPassword) {
            res.status(403).json({ message: "비밀번호 오류" });
        } else if (!userName && userPassword) {
            res.status(403).json({ message: "아이디 오류" });
        } else {
            const { dataValues: { id, username, email, createdAt, updatedAt } } = userName;

            const accessToken = await sign({
                id,
                username,
                email,
                createdAt,
                updatedAt,
            },
                process.env.ACCESS_SECRET, {
                expiresIn: '30s',
            });

            const refreshToken = await sign({
                id,
                username,
                email,
                createdAt,
                updatedAt,
            },
                process.env.REFRESH_SECRET, {
                expiresIn: '7d'
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });

            res.status(200).json({ accessToken: accessToken, message: "로그인 성공 " });
        }
    } else if (req.body.email) {
        const userEmail = await Users.findOne({
            where: { email: req.body.email }
        });

        const userPassword = await Users.findOne({
            where: { password: req.body.password }
        });

        if (userEmail && !userPassword) {
            res.status(403).json({ message: "비밀번호 오류" });
        } else if (!userEmail && userPassword) {
            res.status(403).json({ message: "이메일 오류" });
        } else {
            const { dataValues: { id, username, email, createdAt, updatedAt } } = userEmail;

            const accessToken = await sign({
                id: id,
                username,
                email,
                createdAt,
                updatedAt,
            },
                process.env.ACCESS_SECRET, {
                expiresIn: '30s',
            });

            const refreshToken = await sign({
                id,
                username,
                email,
                createdAt,
                updatedAt,
            },
                process.env.REFRESH_SECRET, {
                expiresIn: '7d'
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });

            res.status(200).json({ accessToken: accessToken, message: "로그인 성공" });
        }
    }
};