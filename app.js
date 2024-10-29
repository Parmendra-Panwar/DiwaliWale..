const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Msges = require('./models/msg.js');
const connectDB = require('./config.js');

// Connect to Database
connectDB();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/msg', (req, res) => {
  res.render('msg');
});

app.get('/frm', (req, res) => {
  res.render('form');
});

app.post('/frm', async (req, res) => {
  try {
    const { frm, to, msg } = req.body;
    const newMsg = new Msges({ frm, to, msg });
    await newMsg.save();
    res.render('link', { id: newMsg._id });
  } catch (err) {
    console.log(err);
  }
});

app.get('/yourmsg/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const msg = await Msges.findById(id);
    if (!msg) {
      return res.status(404).send("Message not found.");
    }
    res.render('yourmsg', { msg });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error.");
  }
});

app.get('/test', (req, res) => {
  res.render('yourmsg')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
