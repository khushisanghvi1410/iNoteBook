import conn from "./db.js";
import express from "express";
const app=express();
const PORT=8000;

conn();

app.listen(PORT,()=>{
    console.log("Server Started");
})
app.get('/',(req,res)=>{
    res.send("Hello");
})



