const express = require ("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// html
app.get("/",(req,res)=>res.sendFile(path.join(__dirname,"./public/index.html")));
app.get("/notes",(req,res)=>res.sendFile(path.join(__dirname,"./public/notes.html")));




app.listen(PORT,()=> console.log("App listening on Port " + PORT));