const express = require("express")
const app = express()





app.get("/",(req,res)=>{
    res.send("This is root");
})

app.listen(5000,()=>{
    console.log("Server is listening")
})