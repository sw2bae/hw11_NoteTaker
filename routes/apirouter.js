const fs = require("fs");
const db = require("../db/db.json");
const express = require("express");
const router = express.Router();
// dummy.json file for creating an uniq ID 
const dummy = require("../db/dummy.json");

//api/notes_POST
router.post("/notes", (req, res) => {
    const newNotes = req.body;
    newNotes.id = dummy.length+1;
    dummy.push(newNotes);
    db.push(newNotes);
    res.json(db);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Note Added!");
    });
    fs.writeFile("./db/dummy.json", JSON.stringify(dummy), (err) => {
        if (err) {
            return console.log(err);
        }
    });
});
// api/notes_GET
router.get("/notes", (req, res) => res.json(db));

//api/notes/id_DELETE
router.delete("/notes/:id", (req, res) => {
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
module.exports = router;