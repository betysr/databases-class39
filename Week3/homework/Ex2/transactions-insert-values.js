import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3_db",
});


const queries = [
    `INSERT INTO account(balance) 
        VALUES (2000),(3000),(4000),(5000);`,

    `INSERT INTO account_changes(account_number, amount, changed_date, remark) 
        VALUES (100,2000,'2022-10-25', 'note1'),
                (101,3000,'2022-10-26', 'note2'),
                (102,4000,'2022-10-27', 'note3'),
                (103,5000,'2022-10-28', 'note4');`
];

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  queries.forEach(sql => {
    con.query(sql, function (err, result) {
      // insert values
      if (err) throw err;
      console.log("Insertions done!");
    });
  });
  
  con.end();
});