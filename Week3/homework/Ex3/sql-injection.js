import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

// sql injection happens
function getPopulation(Country, name, code, cb) {
  con.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

// correct function
function getPopulationCorrected(Country, name, code, cb) {
  name = con.escape(name);
  code = con.escape(code);
  con.query(
    `SELECT Population FROM ${Country} WHERE Name = ${name} and code = ${code}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

// to see the correct one, change function name as getPopulationCorrected
getPopulation("country", "Aruba", "ABW 'OR' 1=1 ;", (error,result)=>{
  if (error) {
    console.log(error);
  }
  console.table(result);
});
con.end();
