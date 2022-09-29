const { Role, User, Sequelize, ROLES } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    let { username, email, password, roles } = req.body;

    if (!roles || !roles.length) {
        roles = [ROLES[0]]
    }
    try {
        const user = await User.create({ username, email, password: bcrypt.hashSync(password, 8) });
        const userRoles = await Role.findAll({ where: { name: { [Sequelize.Op.or]: roles } } });
        await user.setRoles(userRoles);
        res.send({ message: "User resgistered successfully" });
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }

}

exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({ message: "Username Or Password cannot be empty" });
    }

    try {
        var user = await User.findOne({ where: { username } });
    } catch (err) {
        res.status(500).send({ message: e.message || "Something went wrong" });
    }

    if (!user) {
        res.status(400).send({ message: "User Not Found" });
    }
    var isPAsswordValid = bcrypt.compareSync(password, user.password);

    if (!isPAsswordValid) {
        return res.status(401).send({ message: "Invalid Password" })
    }

    console.log(user.id);

    const token=jwt.sign({ id:user.id }, process.env.SECRET_KEY,{expiresIn:86400});

    console.log(token);


    res.send({
        id: user.id,
        ussername: user.username,
        email: user.email,
        roles: user.roles,
        accessToken:token
    })

}