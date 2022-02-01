const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'sqluser',
  host: 'localhost',
  password: 'password',
  database: 'userData'
});

app.post('/create', (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  db.query('INSERT INTO users (email, password) VALUES (?,?)',
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send("Values Inserted")
      }
    }
  );
});


app.listen(3001, () => {
  console.log('server working...')
})