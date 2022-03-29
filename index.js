var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');

var app = express()
var server = http.createServer(app)
var db = new sqlite3.Database('./database/chess.db');

//constants 
const PORT = 5000;


db.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, author TEXT, opening TEXT, year TEXT)');


app.get('/', function(req,res){
    res.send("<h3> Hi there, You are going to perform CRUD operations... <br>"
    + "[CREATE] Please enter 'http://localhost:5000/add/(id number)/(name)/(opening)' to add new opening to the database...\ <br>"
    + "[READ] 'http://localhost:5000/view/(id number)' opening... \ <br>"
    + "[UPDATE] 'http://localhost:5000/update/(id number)/(new name)' to update an opening...\ <br>"
    + "[DELETE] 'http://localhost:5000/del/(id number)' to delete an opening...\ <br>"
    + "Before closing this window, kindly enter 'http://localhost:5000/close' to close the database connection <h3>");
  });


//CREATE
app.get('/add/:id/:author/:opening/:year', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO emp(id,author,opening,year) VALUES(?,?,?,?)', 
            [req.params.id, req.params.author,req.params.opening, req.params.year], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New chess opening has been added");
      res.send("New chess opening has been added into the database with ID = "+req.params.id+ 
      ", author = "+req.params.author+ ", year= "+req.params.year );
    });});});

// GET
app.get('/view/:id', function(req,res){
    db.serialize(()=>{
      db.each('SELECT id ID, author AUTHOR, opening OPENING, year YEAR  FROM emp WHERE id =?',[req.params.id], function(err,row){     
        if(err){
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        res.send(` ID: ${row.ID},    AUTHOR: ${row.AUTHOR}, OPENING: ${row.OPENING}, year: ${row.YEAR}`);
        console.log("Entry displayed successfully");
      });
    });
  });
//UPDATE

app.get('/update/:id/:author/:opening/:year', function(req,res){
    db.serialize(()=>{
      db.run('UPDATE emp SET name = ?, author = ?, opening = ?, year = ? WHERE id = ?', [req.params.name,req.params.id], function(err){
        if(err){
          res.send("Error encountered while updating");
          return console.error(err.message);
        }
        res.send("Entry updated successfully");
        console.log("Entry updated successfully");
      });
    });
  });

//DELETE
app.get('/del/:id', function(req,res){
    db.serialize(()=>{
      db.run('DELETE FROM emp WHERE id = ?', req.params.id, function(err) {
        if (err) {
          res.send("Error encountered while deleting");
          return console.error(err.message);
        }
        res.send("Entry deleted");
        console.log("Entry deleted");
      });
    });});


//CLOSE
app.get('/close', function(req,res){
    db.close((err) => {
      if (err) {
        res.send('There is some error in closing the database');
        return console.error(err.message);
      }
      console.log('Closing the database connection.');
      res.send('Database connection successfully closed');
    });});


server.listen(PORT,function(){
    console.log("Server listening on port: 5000")});