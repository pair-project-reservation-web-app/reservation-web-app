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
  // user: process.env.USER,
  user: 'sqluser',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

//============
// Resgister
//============

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
    res.send({
      loggedIn: true,
      user: req.session.user,
      userId: req.session.userId,
    });
  } else {
    res.send({ loggedIn: false });
  }
});


//===============
// Login, Logout
//===============
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
            req.session.userId = result[0].userId;
            ///////////////// to get user-info //////////////////////////////
            res.send(req.session);
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

app.get("/api/user/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
//============
// Reservation
//============

app.post("/api/reservation", (req, res) => {
  const dineinDate = req.body.dineinDate;
  const dineinTime = req.body.dineinTime;
  const dineinTimeEnd = req.body.dineinTimeEnd;

  db.query(
    "SELECT * FROM reservations WHERE dineinDate = ? AND (dineinTime > ? AND dineinTime < ?);",
    [dineinDate, dineinTime, dineinTimeEnd],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/api/reservation-table", (req, res) => {
  const userId = req.session.userId;
  const tableId = req.body.tableId;
  const dineinDate = req.body.dineinDate;
  const dineinTime = req.body.dineinTime;

  db.query(
    "INSERT INTO reservations (userId, tableId, dineinDate, dineinTime) VALUES(?,?,?,?)",
    [userId, tableId, dineinDate, dineinTime],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Reservation has been set on ${dineinDate} at ${dineinTime}`);
      }
    }
  );

  console.log(userId, tableId, dineinDate, dineinTime);
});

app.get("/api/reservation-status/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM reservations WHERE userId = ?",
    userId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/reservation-cancel/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;

  db.query(
    "DELETE FROM reservations WHERE Id = ?;",
    reservationId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//============
// Reviews
//============

app.post("/api/review", (req, res) => {
  const userId = req.session.userId;
  const rating = +req.body.rating;
  const text = req.body.text;
  const likes = 0;

  db.query(
    "INSERT INTO review (userId, rating, reviewText, likes) VALUES(?,?,?,?)",
    [userId, rating, text, likes],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/reviews", (req, res) => {
  const order = req.query.order;
  const orderBy = req.query.orderBy;

  db.query(
    `SELECT review.id, review.likes, review.rating, review.reviewText, users.userName, review.userID FROM review LEFT JOIN users ON review.userId = users.userId ORDER BY review.${orderBy} ${order}`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/reviews/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    `SELECT review.id, review.likes, review.rating, review.reviewText, users.userName, review.userID FROM review LEFT JOIN users ON review.userId = users.userId WHERE users.userId = ${userId} ORDER BY projectsm.review.rating DESC`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/reviews/:id", (req, res) => {
  const reviewId = req.params.id;

  db.query("DELETE FROM review WHERE id = ?;", reviewId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

try {
  app.listen(HTTP_PORT, () => {
    console.log(`API listening on : ${HTTP_PORT}`);
  });
} catch (error) {
  console.log(error);
}
