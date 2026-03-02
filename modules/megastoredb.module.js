const sql = require("mysql2");

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "mymegastoredatabase",
  database: "megastore",
  port: "3310",
});

connection.connect((error) => {
  if (error) {
    console.log("Error connecting to MySQL: " + error.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + connection.threadId);
});

module.exports = connection;
