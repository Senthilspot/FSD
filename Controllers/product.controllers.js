// const db = require("../models")
const { where } = require("sequelize")
const {Product} = require("../models");

exports.create = (req, res) => {

    const { name, description, cost, categoryId } = req.body;

    if (!name) {
        res.status(400).send({ message: "Name of Product cannot be empty" });
    }
    const product = {
        name,
        description,
        cost,
        categoryId
    }
    Product.create(product)
        .then(product => {
            console.log(`Product with name ${product.name} created Sucessfully`);
            res.status(201).send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something Went Wrong" });
        })
}
exports.findAll=(req, res)=>{
    Product.findAll()
        .then((product) => {
            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went Wrong" })
        })
}


exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
        .then((product) => { 
            if(!product){
            res.status(400).send({message:`Product with id: ${productId} doesn't exists`});
            }

            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.update = (req, res) => {
    const productId = req.params.id;

    const { name, description, cost } = req.body;
    const product = {};
    if (name) {
        product.name = name;
    }
    if (description) {
        product.description = description;
    }
    if (cost) {
        product.cost = cost;
    }
    Product.update(product, {
        where: { id: productId }
    })
        .then((updatedproduct) => {
            res.send({message:`${updatedproduct} records Updated Sucessfully`})
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.delete = (req, res) => {
    const productId = req.params.id;

    Product.destroy({
        where: {
            id: productId
        }
    })
        .then((data) => {
            res.send({ message: "Deleted Sucessfully" })
        })
}