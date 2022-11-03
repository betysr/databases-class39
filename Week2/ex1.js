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

const helper = (sql, res) => {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(res);
  });
};

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  helper("DROP DATABASE IF EXISTS week2_db;", "Database : week2_db dropped!");
  helper(
    "CREATE DATABASE IF NOT EXISTS week2_db;",
    "Database : week2_db created!"
  );
  helper("USE week2_db;", "Database : week2_db!");
  helper(createAuthorsTable, "Authors table created!");
  helper(addMentorColumn, "Mentor column added!");
  helper(addFk, "Foreign key added!");

  con.end();
});
