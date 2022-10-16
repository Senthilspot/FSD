const { User } = require("../models");

exports.findAll = (req, res) => {

    User.findAll()
        .then(users => {
            res.send(users)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })
}
exports.delete = (req, res) => {
    const UserId = req.params.id;

    User.destroy({
        where: {
            id: UserId
        }
    })
        .then((data) => {
            res.send({ message: "Deleted Sucessfully" });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.update = (req, res) => {
    if (!req.roles.includes('admin')) {
        return res.status(403).send({ message: "OOPS! you are unauthorized to perform this task" });
    }

    const userId = req.params.id;

    const { name, email } = req.body;

    const user = {};

    if (name) {
        user.name = name;
    }

    if (email) {
        user.email = email;
    }

    User.update(user, {
        where: { id: userId }
    })
        .then((updateduser) => {
            res.send({ message: `${updateduser[0]} records updated successfully}` });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong" });
        })
}