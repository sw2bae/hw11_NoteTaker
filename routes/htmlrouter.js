const path = require("path");
const express = require("express");
const router = express.Router();
// const app = express();
// assets
// app.use(express.static("public"));

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "..public/index.html")));
router.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "../public/notes.html")));

module.exports = router;
