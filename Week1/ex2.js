// for creating database and tables from sql file : mysql -u hyfuser -p < world.sql
import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const queries = [
  // What are the names of countries with population greater than 8 million?
  `SELECT name, population
    FROM country 
    WHERE population > 8000000;`,

  // What are the names of countries that have “land” in their names?
  `SELECT name 
    FROM country 
    WHERE name LIKE '%land%';`,

  // What are the names of the cities with population in between 500,000 and 1 million?
  `SELECT name, population
    FROM city 
    WHERE population BETWEEN 500000 AND 1000000;`,

  // What's the name of all the countries on the continent ‘Europe’?
  `SELECT name 
    FROM country 
    WHERE continent = 'Europe';`,

  // List all the countries in the descending order of their surface areas.
  `SELECT * 
    FROM country 
    ORDER BY surfaceArea DESC;`,

  // What are the names of all the cities in the Netherlands?
  `SELECT * 
    FROM city 
    WHERE countryCode = 'NLD';`,

  // What is the population of Rotterdam?
  `SELECT name, population 
    FROM city 
    WHERE name = 'Rotterdam';`,

  // What's the top 10 countries by Surface Area?
  `SELECT name, surfaceArea
    FROM country
    ORDER BY surfaceArea DESC LIMIT 10;`,

  // What's the top 10 most populated cities?
  `SELECT name, population
    FROM city 
    ORDER BY population DESC LIMIT 10;`,

  // What is the population number of the world?
  `SELECT SUM(population) AS 'population of the world' 
    FROM city;`,
];

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("USE new_world;", function (err, result) {
    // use database
    if (err) throw err;
    console.log("Database : new_world");
  });

  queries.forEach((sql) => {
    con.query(sql, function (err, result) {
      // queries
      if (err) throw err;
      console.log("QUERY IS:", sql);
      console.log(result);
    });
  });

  con.end();
});
