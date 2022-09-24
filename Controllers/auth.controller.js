const { Role, User, Sequelize, ROLES } = require("../models");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
    let { username, email, password, roles } = req.body;

    if (!roles || !roles.length) {
        role = [ROLES[0]]
    }

    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    })
        .then(user => {
            Role.findAll({
                where: {
                    name: {
                        [Sequelize.Op.or]: roles
                    }
                }
            })
                .then(roles => {
                    user.setRoles(roles)
                        .then(() => {
                            res.send({ message: "User resgistered successfully" });
                        })
                })
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong" });
        })
}