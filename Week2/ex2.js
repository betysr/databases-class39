import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2_db",
});

const createResearchPapersTable = `CREATE TABLE IF NOT EXISTS research_papers (
    paper_id INT NOT NULL AUTO_INCREMENT, 
    paper_title VARCHAR(255) NOT NULL, 
    conference VARCHAR(255) NOT NULL,
    publish_date DATE NOT NULL,
    PRIMARY KEY (paper_id));`;

const authorWithPapers = `CREATE TABLE IF NOT EXISTS authorWithPaper (
  id INT NOT NULL AUTO_INCREMENT,
  author_id INT,
  paper_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id));`;

const insertAuthors = `INSERT INTO authors(author_name, university, date_of_birth, h_index, gender, mentor) 
                        VALUES ('Mustafa', 'Delft University', '1994-01-01', 15, 'M', 1),   
                                ('Els', 'California University', '1962-08-15', 10, 'F', 2), 
                                ('Rene', 'Rotterdam University', '1958-10-17', 16, 'M', 3),
                                ('Jorien', 'Amsterdam University', '1960-06-10', 13, 'F', 4), 
                                ('Ans', 'University of Groningen', '1980-02-08', 11, 'F', 1), 
                                ('Jul', 'Leiden University', '1955-09-04', 9, 'M', 5),  
                                ('Josien', 'Maastricht University', '1956-03-05', 12, 'F', 6),
                                ('Dirk', 'Tilburg University', '1995-02-07', 15, 'M', 7),
                                ('Rommy', 'Utrecth University', '1996-01-09', 10, 'F', 2),
                                ('Rick', 'University of Twente', '1955-10-11', 11, 'M', 3),
                                ('Jul', 'Leiden University', '1955-09-04', 9, 'M', 8),
                                ('Maria', 'Vrije University', '1955-09-04', 9, 'M', 10), 
                                ('Tinus', 'Erasmus University', '1945-12-11', 9, 'M', 9),
                                ('Betul', 'Radboud University', '1994-06-10', 15, 'F', 11),
                                ('Jan', 'Vrije University', '1960-05-10', 12, 'M', 12)`;

const insertResearchPaper = `INSERT research_Papers(paper_title, conference, publish_date) 
                              VALUES ('Paper title 1', 'Conference 1', '2022-10-20'),
                                      ('Paper title 2', 'Conference 2', '2022-10-20'),
                                      ('Paper title 3', 'Conference 3', '2022-10-19'),
                                      ('Paper title 4', 'Conference 4', '2022-10-18'),
                                      ('Paper title 5', 'Conference 5', '2022-10-17'),
                                      ('Paper title 6', 'Conference 6', '2022-10-16'),
                                      ('Paper title 7', 'Conference 7', '2022-10-15'),
                                      ("Paper title 8", "Conference 8", "2022-10-14"),
                                      ("Paper title 9", "Conference 9", "2022-10-13"),
                                      ("Paper title 10", "Conference 10", "2022-10-12"),
                                      ("Paper title 11", "Conference 11", "2022-10-11"),
                                      ("Paper title 12", "Conference 12", "2022-10-10"),
                                      ("Paper title 13", "Conference 13", "2022-10-9"),
                                      ("Paper title 14", "Conference 14", "2022-10-8"),
                                      ("Paper title 15", "Conference 15", "2022-10-7"),
                                      ("Paper title 16", "Conference 16", "2022-10-6"),
                                      ("Paper title 17", "Conference 17", "2022-10-5"),
                                      ("Paper title 18", "Conference 18", "2022-10-4"),
                                      ("Paper title 19", "Conference 19", "2022-10-3"),
                                      ("Paper title 20", "Conference 20", "2022-10-2"),
                                      ("Paper title 21", "Conference 21", "2022-10-1"),
                                      ("Paper title 22", "Conference 22", "2022-09-30"),
                                      ("Paper title 23", "Conference 23", "2022-10-29"),
                                      ("Paper title 24", "Conference 24", "2022-10-28"),
                                      ("Paper title 25", "Conference 25", "2022-10-27"),
                                      ("Paper title 26", "Conference 26", "2022-10-26"),
                                      ("Paper title 27", "Conference 27", "2022-10-25"),
                                      ("Paper title 28", "Conference 28", "2022-10-24"),
                                      ("Paper title 29", "Conference 29", "2022-10-23"),
                                      ("Paper title 30", "Conference 30", "2022-10-22")`;

const insertAuthorWithPaper = `INSERT authorWithPaper(author_id, paper_id) 
                                VALUES (1,1),
                                        (2,3),
                                        (3,5),
                                        (4,7),
                                        (5,8),
                                        (10,12),
                                        (12,6),
                                        (9,4),
                                        (11,3);`;

const helper = (sql, res) => {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.table(res);
  });
};

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  helper(createResearchPapersTable, "Research_papers table created!");
  helper(authorWithPapers, "AuthorWithPaper table created!");
  helper(insertAuthors, "Inserted into authors table!");
  helper(insertResearchPaper, "Inserted into research_paper table!");
  helper(insertAuthorWithPaper, "Inserted into authorWithPaper table!");
  con.end();
});
