import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2_db",
});

const queries = [
  // Write a query that prints names of all authors and their corresponding mentors.
  `SELECT table1.author_name, table2.author_name as mentor_name
    FROM authors AS table1 
    JOIN authors AS table2
      ON table1.mentor = table2.author_id;`,
  //Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
  `SELECT authors.*, rp.paper_title 
    FROM authors 
    LEFT JOIN authorWithPaper AS awp
      ON authors.author_id = awp.author_id 
    LEFT JOIN research_papers AS rp 
      ON awp.paper_id = rp.paper_id;`,
];

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  queries.forEach((sql) => {
    // queries
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

  con.end();
});
