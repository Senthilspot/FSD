const categoryController = require("../Controllers/category.controllers")

module.exports = (app) => {
    //Create a new Category
    app.post("/ecomm/api/v1/category", categoryController.create)

    //get all the routes
    app.get("/ecomm/api/v1/category",categoryController.getAll);

    //get route y category id
    app.get("/ecomm/api/v1/category/:id",categoryController.getOne);

    //Update a route y given id
    app.put("/ecomm/api/v1/category/:id",categoryController.update);

    // delete A route by a category id
    app.delete("/ecomm/api/v1/category/:id",categoryController.delete);

    //Find all Products by the Category id
    app.get("/ecomm/api/v1/Allcategory/:id",categoryController.getycategoryid);
}