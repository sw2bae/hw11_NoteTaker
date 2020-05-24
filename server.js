const express = require ("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
// const fs = require("fs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// assets
app.use(express.static('public'));

const saveNotes = []; 

// html
app.get("/",(req,res)=>res.sendFile(path.join(__dirname,"./public/index.html")));
app.get("/notes",(req,res)=>res.sendFile(path.join(__dirname,"./public/notes.html")));


//API_POST
app.post("/api/notes",(req,res)=>{
    const newNotes = req.body;
    saveNotes.push(newNotes);
    res.json(newNotes);
});

// API_GET
app.get("/api/notes",(req,res)=>res.json(saveNotes));

// app.get("/api/notes/:id", function(req, res) {
//     var id = req.params.id;
//     console.log(id);
//     for (var i = 0; i < saveNotes.length; i++) {
//       if (id === saveNotes[i].id) {
//         return res.json(saveNotes[i]);
//       }
//     }
//     return res.json(false);
//   });

app.listen(PORT,()=> console.log("App listening on Port " + PORT));
