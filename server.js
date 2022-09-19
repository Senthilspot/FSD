const express = require("express");
const config = require("./configs/db.config")
const bodyParser = require("body-parser");
require("dotenv").config();

const app=express();

app.use(bodyParser.json());

const db=require("./models");



db.sequelize.sync({force:false})
.then(()=>{
    console.log("DB synced");
})
//impoted category routes
require("./Routes/category.routes")(app);

app.listen(process.env.PORT,()=>{
    console.log(`Application is Running on Port ${process.env.PORT}`);
})