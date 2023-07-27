module.exports = (sequelize, Sequelize) => {
    return sequelize.define("posts_comments", {
        body: {
            type: Sequelize.STRING
        },
        postId: {
            type: Sequelize.INTEGER,
            references: {
                model: "posts",
                key: "id"
            },
        },
        sender: {
            type: Sequelize.STRING,
        },
        rate: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
        }
    })
}