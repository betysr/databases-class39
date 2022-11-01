import { createConnection } from "mysql";
import { promisify } from "util";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3_db",
});

const execQuery = promisify(con.query.bind(con));

async function transaction() {
  con.connect();
  // if it works fine, try block will run
  try {
    await execQuery(`SET AUTOCOMMIT = 0`)
    await execQuery("START TRANSACTION"); // start transaction
    await execQuery(
      `UPDATE account 
        SET account.balance=(account.balance-1000) 
        WHERE account.account_number = 101;`
    );
    await execQuery(
      `UPDATE account 
        SET account.balance=(account.balance+1000) 
        WHERE account.account_number = 102;`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number, amount, changed_date, remark) 
        VALUES (101,-1000,'2022-10-29','from 101 to 102')`
    );
    await execQuery(
      `INSERT INTO account_changes (account_number, amount, changed_date, remark) 
        VALUES (102,1000,'2022-10-29','getting from 101')`
    );
    await execQuery("COMMIT"); 
    console.log("End with COMMIT!");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK"); // if there is any problem, it will be rollbacked!
    console.log("End with ROLLBACK!");
    con.end();
  }

  con.end();
}

transaction();