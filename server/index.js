const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      expires: 3600000,
    },
  })
);

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post("/api/user/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const contact = req.body.contact;
  const fullname = req.body.fullname;

  bcrypt.hash(password, +process.env.SALTROUNDS, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (userName, userPassword, userContact, userFullname) VALUES (?,?,?,?)",
      [username, hash, contact, fullname],
      (err, result) => {
        res.send(err);
      }
    );
  });
});

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/api/user/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.post("/api/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE userName = ?",
    username,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].userPassword, (err, response) => {
          if (response) {
            req.session.user = result[0].userName;
            res.send(req.session.user);
          } else {
            res.send({ message: "Wrong username or password" });
          }
        });
      } else {
        res.send({ message: "User does not exist" });
      }
    }
  );
});

try {
  app.listen(HTTP_PORT, () => {
    console.log(`API listening on : ${HTTP_PORT}`);
  });
} catch (error) {
  console.log(error);
}
