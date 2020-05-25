const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// assets
app.use(express.static('public'));

// html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

//api/notes POST
app.post("/api/notes", (req, res) => {
    const newNotes = req.body;
    newNotes.id = db.length;
    db.push(newNotes);
    res.json(db);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Note Added!");
    });
});

// api/notes_GET
app.get("/api/notes", (req, res) => res.json(db));

//api/notes/id_DELETE
app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id;
    let itemToFind = db.find((db)=>db.id==id);
    let index = db.indexOf(itemToFind);
    if (index > -1){db.splice(index, 1)};
    res.json(db);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Note Deleted!");
    });
});

app.listen(PORT, () => console.log("App listening on Port " + PORT));

