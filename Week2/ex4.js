import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2_db",
});

const queries = [
  // All research papers and the number of authors that wrote that paper.
  `SELECT rp.paper_title, COUNT(rp.paper_title ) AS "Number of Authors" 
    FROM authors 
    JOIN authorWithPaper AS awp 
      ON authors.author_id = awp.author_id
    JOIN research_papers AS rp 
      ON awp.paper_id = rp.paper_id 
    GROUP BY rp.paper_title;`,

  // Sum of the research papers published by all female authors.
  `SELECT authors.gender, COUNT(awp.paper_id) AS 'Research Papers Published by Female'
    FROM research_papers AS rp
    LEFT JOIN authorWithPaper AS awp 
      ON awp.paper_id = rp.paper_id
    LEFT JOIN authors 
      ON authors.author_id = awp.author_id
    WHERE authors.gender = 'F'
    GROUP BY authors.gender;`,

  // Average of the h-index of all authors per university.
  `SELECT university, AVG(h_index) AS 'AVG of H_INDEX'
    FROM authors
    GROUP BY university;`,

  // Sum of the research papers of the authors per university.
  `SELECT authors.university, COUNT(awp.paper_id) AS 'Sum of the Research Papers'
    FROM authors
    LEFT JOIN authorWithPaper as awp
      ON awp.author_id = authors.author_id
    GROUP BY authors.university;`,

  //Minimum and maximum of the h-index of all authors per university.
  `SELECT university, MIN(h_index) AS 'MIN', MAX(h_index) AS 'MAX'
    FROM authors
    GROUP BY university;`,
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
