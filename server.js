const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

//api&html routers
const apiRouter = require("./routes/apirouter");
const htmlRouter = require("./routes/htmlrouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// assets
app.use(express.static("public"));

//routers
app.use("/api",apiRouter);
app.use("/",htmlRouter);

//server listen
app.listen(PORT, () => console.log("App listening on Port " + PORT));

