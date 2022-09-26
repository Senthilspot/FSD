
const { Product, Category, Sequelize } = require("../models");
const Op= Sequelize.Op;


exports.create = (req, res) => {

    const { name, description, cost, categoryId } = req.body;
    const product = { name, description, cost, categoryId };

    Product.create(product)
        .then(product => {
            console.log(`Product with name ${product.name} created Sucessfully`);
            res.status(201).send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something Went Wrong" });
        })
}

// GET localhost:8080/ecomm/api/v1/products?minCost=80000
// GET localhost:8080/ecomm/api/v1/products?maxCost=80000
// GET localhost:8080/ecomm/api/v1/products?minCost=60000&maxCost=80000
exports.findAll = (req, res) => {
    const {name,minCost,maxCost} = req.query;


    console.log(req.query);

    if(name){
        productsPromise=Product.findAll({
            where:{
                name:name
            }
        })    
    }
    else if(minCost && maxCost){

        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.gte]:minCost,
                [Op.lte]:maxCost
            }
        }
        })
    }
    else if(minCost){
        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.gte]:minCost            
            }
        }
        })

    }
    else if(maxCost){
        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.lte]:maxCost           
             }
        }
        })
    }
    else{
        productsPromise=Product.findAll();
    }
  
    productsPromise
    .then(products=>{
        res.send(products)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}


exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
        .then((product) => {
            if (!product) {
                res.status(400).send({ message: `Product with id: ${productId} doesn't exists` });
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
            res.send({ message: `${updatedproduct} records Updated Sucessfully` });
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
            res.send({ message: "Deleted Sucessfully" });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}


exports.getallproductbycategoryid = (req, res) => {
    Product.findAll({
        where: {
            categoryId: req.params.categoryid
        }
    })
        .then(products => {
            res.send(products);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong while getting products for given categroy Id" });
        })
}


exports.findproductundercategory = (req, res) => {
    Product.findAll({
        where: {
            categoryId: req.params.categoryid,
            id: req.params.productid
        }
    })
        .then(product => {
            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong while getting products for given categroy Id" });
        })
}
