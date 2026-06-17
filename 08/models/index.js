const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../board.db"), // 09/board.db 파일
  logging: false,
});

const User = require("./user")(sequelize);
const Post = require("./post")(sequelize);

User.hasMany(Post, { foreignKey: "userId", as: "posts"});
Post.belongsTo(User, {foreignKey: "userId", as: "users"});

module.exports = { sequelize, User, Post };
