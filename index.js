var sqlite3 = require('sqlite3').verbose();
var express = require('express');

const cors = require('cors');
var bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//constants 
const HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('database/chess.db')

app.get("/Chess_openings/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM Chess_openings where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

app.get("/Chess_openings", (req, res, next) => {
    db.all("SELECT * FROM Chess_openings", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({rows});
      });
});

app.post("/Chess_openings/", (req, res, next) => {
    var reqBody = req.body;
    db.run(`INSERT INTO Chess_openings (author, title, year) VALUES (?,?,?)`,
        [req.body.author, req.body.title, req.body.year],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            var location = "/Chess_openings/" + this.lastID;
            res.set('Location', location)
            res.status(201).json({
                "id": this.lastID
            })
        });
});

app.put("/Chess_openings/:id", (req, res, next) => {
    var reqBody = req.body;
    db.run(`UPDATE Chess_openings set author = ?, title = ?, year = ? WHERE id = ?`,
        [reqBody.author, reqBody.title, reqBody.year, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            if(this.changes == 0) {
              res.status(404).json({"error": "Entry cannot be UPDATED"})
              return
            }
            res.status(200).json({ updatedID: req.params.id });
        });
});

app.patch("/Chess_openings/:id", (req, res, next) => {
    var reqBody = req.body;
    db.run(`UPDATE Chess_openings set author = ? WHERE id = ?`,
        [reqBody.author, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            if(this.changes == 0) {
              res.status(404).json({"error": "Entry cannot be PATCHED"})
              return
            }
            res.status(200).json({ updatedID: req.params.id });
        });
});

app.delete("/Chess_openings/:id", (req, res, next) => {
  var sql = `DELETE FROM Chess_openings WHERE id = ?`;
    db.run(`DELETE FROM Chess_openings WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                //res.status(500).json({ "error": res.message })
                //return;
              res.status(400).json({"error": res.message})
              return
            }
            if(this.changes == 0) {
              res.status(404).json({"error": "Entry is deleted"})
              return
            }
            res.json({"message":"Deleted", DeletedID: this.lastID})

        });
});
