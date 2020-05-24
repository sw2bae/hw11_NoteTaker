const express = require ("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// assets
app.use(express.static('public'));

// html
app.get("/",(req,res)=>res.sendFile(path.join(__dirname,"./public/index.html")));
app.get("/notes",(req,res)=>res.sendFile(path.join(__dirname,"./public/notes.html")));



//API_POST
app.post("/api/notes",(req,res)=>{
    const newNotes = req.body;
    newNotes.id = db.length
    db.push(newNotes);
    res.json(db);
    fs.writeFile("./db/db.json",JSON.stringify(db),(err)=>{
        if (err) {
            return console.log(err);
          }
          console.log("Success!");
    });
});

// API_GET
app.get("/api/notes",(req,res)=>res.json(db));
console.log(db);

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
