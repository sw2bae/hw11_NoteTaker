const fs = require("fs");
const db = require("../db/db.json");
const express = require("express");
const router = express.Router();

//api/notes_POST
router.post("/notes", (req, res) => {
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