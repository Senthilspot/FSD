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