import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const createTables = [
  // create Invitee table
  `CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT,
      invitee_name VARCHAR(30),
      invited_by VARCHAR(30),
      PRIMARY KEY (invitee_no));`,
  // create Room table
  `CREATE TABLE IF NOT EXISTS Room (
      room_no INT,
      room_name VARCHAR(30), 
      floor_number INT,
      PRIMARY KEY (room_no));`,
  // create Meeting table
  `CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT, 
      meeting_title VARCHAR(30), 
      starting_time DATETIME, 
      ending_time DATETIME, 
      room_no INT,
      PRIMARY KEY (meeting_no),
      FOREIGN KEY (room_no) REFERENCES Room(room_no));`,
];

const insertTables = [
  // INSERT FOR INVITEE TABLE
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (1, 'Mustafa', 'Betul');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (2, 'Jan', 'Zaya');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (3, 'Jorien', 'Ans');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (4, 'Rene', 'Martijn');`,
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (5, 'Tinus', 'Amari');`,

  // INSERT FOR ROOM TABLE
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (1, 'Room Amsterdam', 5);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (2, 'Room Weesp', 3);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (3, 'Room Rotterdam', 4);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (4, 'Room Utrecth', 6);`,
  `INSERT INTO Room (room_no, room_name, floor_number) VALUES (5, 'Room Zaandam', 2);`,

  // INSERT FOR INVITEE TABLE
  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (1, 'Meeting for Amsterdam', '2022-10-18 12:00:00', '2022-10-18 13:00:00', 1);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (2, 'Meeting for Weesp', '2022-10-19 14:00:00', '2022-10-19 15:00:00', 2);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (3, 'Meeting for Rotterdam', '2022-10-20 15:00:00', '2022-10-20 16:00:00', 3);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (4, 'Meeting for Utrecth', '2022-10-21 16:00:00', '2022-10-21 17:00:00', 4);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) 
      VALUES (5, 'Meeting for Zandaam', '2022-10-22 17:00:00', '2022-10-22 18:00:00', 5);`,
];

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS meetup;", function (err, result) {
    // creating database meetup
    if (err) throw err;
    console.log("Database created");
  });

  con.query("USE meetup;", function (err, result) {
    // use database
    if (err) throw err;
    console.log("Database : meetup");
  });

  createTables.forEach((sql) => {
    con.query(sql, function (err, result) {
      // creating all tables from createTables array
      if (err) throw err;
      console.log();
      ("Table created");
    });
  });

  insertTables.forEach((sql) => {
    con.query(sql, function (err, result) {
      // adding data coming from insertTables array
      if (err) throw err;
      console.log("Data added");
    });
  });

  con.end();
});
