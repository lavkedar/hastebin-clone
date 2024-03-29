const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Document = require("./models/document");

mongoose.connect("mongodb://127.0.0.1:27017/Hastebin");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  code = `Welcome to HasteBin!
 
Use the commands in the top right corner
to create a new file to share with others`;
  res.render("code-display", { code: code, language: "plaintext" });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const value = req.body.value;

  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (e) {
    res.render("new", { value });
  }
  console.log(value);
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("new", { value: document.value });
  } catch (e) {
    res.redirect(`${id}`);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value, id: document.id });
  } catch (e) {
    res.redirect("/");
  }
});

app.listen(3000);
console.log("shaka laka baoom boom ");
