import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const createAuthorsTable = `CREATE TABLE IF NOT EXISTS authors (
                              author_id INT NOT NULL AUTO_INCREMENT, 
                              author_name VARCHAR(30), 
                              university VARCHAR(50),
                              date_of_birth DATE,
                              h_index INT,
                              gender enum('F', 'M'),
                              PRIMARY KEY (author_id));`;

const addMentorColumn = `ALTER TABLE authors
  ADD mentor INT;`;

const addFk = `ALTER TABLE authors
  ADD FOREIGN KEY (mentor) REFERENCES authors(author_id);`;

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS week2_db;", function (err, result) {
    // if exist drop database week2_db
    if (err) throw err;
    console.log("Database : week2_db dropped!");
  });

  con.query("CREATE DATABASE IF NOT EXISTS week2_db;", function (err, result) {
    // creating database week2_db
    if (err) throw err;
    console.log("Database : week2_db created!");
  });

  con.query("USE week2_db;", function (err, result) {
    // use database
    if (err) throw err;
    console.log("Database : week2_db!");
  });

  con.query(createAuthorsTable, function (err, result) {
    // creating authors table
    if (err) throw err;
    console.log("Authors table created!");
  });

  con.query(addMentorColumn, function (err, result) {
    // add mentor column
    if (err) throw err;
    console.log("Mentor column added!");
  });

  con.query(addFk, function (err, result) {
    // add foreign key
    if (err) throw err;
    console.log("Foreign key added!");
  });

  con.end();
});
