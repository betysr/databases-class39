import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const queries = [
  `CREATE TABLE account (
        account_number INT NOT NULL AUTO_INCREMENT,
        balance INT NOT NULL,
        PRIMARY KEY (account_number)
        );`,

  `ALTER TABLE account AUTO_INCREMENT = 100`,
  
  `CREATE TABLE account_changes (
        change_number INT NOT NULL AUTO_INCREMENT,
        account_number INT NOT NULL,
        amount INT NOT NULL,
        changed_date DATE NOT NULL,
        remark varchar(128) NOT NULL,
        PRIMARY KEY (change_number),
        FOREIGN KEY (account_number) REFERENCES account (account_number)
      );`,
];

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS week3_db;", function (err, result) {
    // if exist drop database week3_db
    if (err) throw err;
    console.log("Database : week3_db dropped!");
  });

  con.query("CREATE DATABASE IF NOT EXISTS week3_db;", function (err, result) {
    // creating database week3_db
    if (err) throw err;
    console.log("Database : week3_db created!");
  });

  con.query("USE week3_db;", function (err, result) {
    // use database
    if (err) throw err;
    console.log("Database : week3_db!");
  });

  queries.forEach((sql)=>{
    con.query(sql, function (err, result) {
      // creating tables
      if (err) throw err;
      console.log("Tables created!");
    });
  })

  con.end();
});
