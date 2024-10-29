const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Msges = require('./models/msg.js')
const { render } = require('ejs');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const connectDB = require('./config.js');
connectDB();


app.get('/', (req, res) => {
  res.render('./home.ejs')
})
app.get('/msg', (req, res) => {
  res.render('./msg.ejs');
})
app.get('/form', (req, res) => {
  res.render('./form.ejs');
})
app.post('/form', async (req, res) => {
  try {
    const { from, to, msg } = req.body;
    let newMsg = new Msges({
      from: from,
      to: to,
      msg: msg
    });
    await newMsg.save();
    res.render('/link');
  } catch (err) {
    console.log(err);
  }
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})