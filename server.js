const express = require("express");
const app=express();

const db=require("./models");



db.sequelize.sync({force:true})
.then(()=>{
    console.log("DB synced");
})



app.listen(process.env.PORT,()=>{
    console.log(`Application is Running on Port 8000`);
})