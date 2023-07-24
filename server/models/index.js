const config = require("../config/config.json");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

const Posts = require("./Posts")(sequelize, Sequelize);
const PostComments = require("./PostComments")(sequelize, Sequelize);
const PostCommentReplies = require("./PostCommentReplies")(sequelize, Sequelize);

Posts.hasMany(PostComments);
PostComments.belongsTo(Posts);

PostCommentReplies.belongsTo(PostComments, {foreignKey: "postCommentId"});
PostComments.hasMany(PostCommentReplies, {foreignKey: "postCommentId"});

module.exports = {
  Posts,
  PostComments,
  PostCommentReplies
};
