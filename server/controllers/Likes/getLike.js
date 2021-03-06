const { Posts, Likes } = require('../../models');

module.exports = async (req, res) => {
    const postInfos = await Posts.findOne({
        where: { id: req.query.post_id }
    });

    if (postInfos) {

        Promise.all(postInfos.dataValues.like_id.map(async el => {

            const likeInfos = await Likes.findOne({
                where: { id: el }
            });

            if (likeInfos) {
                return likeInfos.dataValues;
            } else {
                res.status(200).json({ message: "좋아요 ID 정보가 일치하지 않습니다" })
            }
        }))
            .then(result => {

                const arr = result.filter(el => {
                    return el.value === true;
                });

                const rest = arr.map(el => el.user_id)

                res.status(200).json(
                    {
                        data: rest,
                        message: "좋아요 데이터 불러오기 성공"
                    })
            })

    } else {
        res.status(200).json({ message: "포스트 ID 정보가 일치하지 않습니다" })
    }
};