const userService = require("../services/userService");

const list = async (req, res) => {
    res.json(await userService.list());
}
const get = async (req, res) => {
    const user = await userService.get(req.params.id);
    if (!user) {
        res.status(404).json({message: "사용자를 찾을 수 없습니다."})
    }
    res.json(user);
}

const create = async(req, res) => {
    const {name, email} = req.body;
    if (!name || !email ) {
        return res.status(400).json({message: "name과 email은 필수예요"});
    }

    const user = await userService.create({name, email});
    res.status(201).json(user);
}

module.exports = {list, get, create};