const { User } = require("../models");

const list = () => User.findAll({ order: [["id", "ASC"]]});

const get = (id) => User.findByPk(id);

const create = ({name, email}) => User.create({name, email});

module.exports = {list, get, create};