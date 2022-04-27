var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('chess.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {

        db.run('CREATE TABLE Chess_openings( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            author NVARCHAR(20)  NOT NULL,\
            title NVARCHAR(20),\
            year INTEGER,\
            color NVARCHAR(20) DEFAULT "White"\
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