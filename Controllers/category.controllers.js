const db = require("../models")
const { where } = require("sequelize")
const Category = db.Category;

exports.create = (req, res) => {

    const { name, description } = req.body;

    if (!name) {
        res.status(400).send({ message: "Name of Category cannot be empty" });
    }
    const category = {
        name: name,
        description: description
    }
    Category.create(category)
    .then(category => {
        console.log(`category with name ${category.name} created Sucessfully`);
        res.status(201).send(category);
    })
    .catch((err) => {
        res.status(500).send({ message: "Something Went Wrong" });
    })

}
exports.getAll = (req, res) => {
    Category.findAll()
        .then((categories) => {
            res.send(categories);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went Wrong" })
        })
}


exports.getOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId)
        .then((category) => { 
            if(!category){
            res.status(400).send({message:`Category with id: ${categoryId} doesn't exists`});
            }

            res.send(category);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.update = (req, res) => {
    const categoryId = req.params.id;

    const { name, description } = req.body;
    const category = {};
    if (name) {
        category.name = name;
    }
    if (description) {
        category.description = description;
    }
    Category.update(category, {
        where: { id: categoryId }
    })
        .then((updatedCategory) => {
            res.send({message:`${updatedCategory} records Updated Sucessfully`})
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({
        where: {
            id: categoryId
        }
    })
        .then((data) => {
            res.send({ message: "Deleted Sucessfully" })
        })
}