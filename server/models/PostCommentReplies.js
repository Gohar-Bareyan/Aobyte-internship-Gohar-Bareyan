module.exports = (sequelize, Sequelize) => {
    return sequelize.define("post_comment_replies", {
        content: {
            type: Sequelize.STRING
        },
        postCommentId: {
            type: Sequelize.INTEGER,
            references: {
                model: "posts_comments",
                key: "id"
            }
        },
    })
}