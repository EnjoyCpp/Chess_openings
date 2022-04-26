var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');

var app = express()
var server = http.createServer(app)

//constants 
const HTTP_PORT = 5000;


app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('database/chess.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE Chess_openings( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            author NVARCHAR(20)  NOT NULL,\
            title NVARCHAR(20),\
            year INTEGER\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO Chess_openings (author, title, year) VALUES (?,?,?)';
            db.run(insert, ["Greco","Italian Game",1620]);
            db.run(insert, ["James Mason","London System",1922]);
            db.run(insert, ["Horatio Caro and Marcus Kann","Caro–Kann Defence",1886]);
            db.run(insert, ["Giulio Cesare Polerio","Sicilian Defence",1594]);
            db.run(insert, ["Ruy López de Segura","Ruy López",1490]);
        });
    }
});


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
    var reqBody = re.body;
    db.run(`INSERT INTO Chess_openings (author, title, year) VALUES (?,?,?,?)`,
        [reqBody.author, reqBody.title, reqBody.year],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "id": this.lastID
            })
        });
});


app.patch("/Chess_openings/", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE Chess_openings set author = ?, title = ?, year = ? WHERE id = ?`,
        [reqBody.author, reqBody.title, reqBody.year, reqBody.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});


app.delete("/Chess_openings/:id", (req, res, next) => {
    db.run(`DELETE FROM user WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});

