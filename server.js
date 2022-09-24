const express = require("express");
const config = require("./configs/db.config")
const bodyParser = require("body-parser");
require("dotenv").config();

const { Role } = require("./models");

const app = express();

app.use(bodyParser.json());

const db = require("./models");



db.sequelize.sync({ force: false })
    .then(() => {
        console.log("DB synced");
    })


/**
 * Add roles 
 */

//  Role.create({
//     id:1,
//     name:"user"
// });

// Role.create({
//     id:2,
//     name:"admin"
// })

//impoted category routes
require("./Routes/category.routes")(app);
// omport Product routes
require("./Routes/product.routes")(app);

//import Auth routes 
require("./Routes/auth.routes")(app);
//import User routes 
require("./Routes/user.routes")(app);



app.listen(process.env.PORT, () => {
    console.log(`Application is Running on Port ${process.env.PORT}`);
})