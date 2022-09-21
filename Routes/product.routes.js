const ProductControllers = require("../Controllers/product.controllers")

module.exports = (app) => {
    // Create a New Product
    app.post("/ecomm/api/v1/products", ProductControllers.create)

    //get all the routes
    app.get("/ecomm/api/v1/products", ProductControllers.findAll);


    //get route y category id
    app.get("/ecomm/api/v1/products/:id",ProductControllers.findOne);

    //Update a route y given id
    app.put("/ecomm/api/v1/products/:id",ProductControllers.update);

    // delete A route by a category id
    app.delete("/ecomm/api/v1/products/:id",ProductControllers.delete);
}