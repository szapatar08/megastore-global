const { parse } = require("csv-parse");
const sql = require("../modules/megastoredb.module");
const log = require("../modules/logmegastore.module");
const fs = require("fs");

const customers = (req, res) => {
  const rows = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      try {
        if (rows.length) {
          const values = rows
            .map(
              (r) =>
                `('${r.name}', '${r.email}', '${r.address}', '${r.phone}')`,
            )
            .join(",");
          sql.query(
            `INSERT INTO costumers (name, email, address, phone) VALUES ${values}`,
          );
          await log.create({
            name: `Upload files to customers table, total rows added: ${rows.length}`,
          });
          res.status(200).json({ Uploded: true, total: rows.length });
        }
      } catch (error) {
        res.status(500).json({ Uploded: false, error: "Internal Error" });
        console.log(error);
      }
    });
};

const suppliers = (req, res) => {
  const rows = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      try {
        if (rows.length) {
          const values = rows
            .map((r) => `('${r.name}', '${r.email}')`)
            .join(",");
          sql.query(`INSERT INTO suppliers (name, email) VALUES ${values}`);
          await log.create({
            name: `Upload files to suppliers table, total rows added: ${rows.length}`,
          });
          res.status(200).json({ Uploded: true, total: rows.length });
        }
      } catch (error) {
        res.status(500).json({ Uploded: false, error: "Internal Error" });
        console.log(error);
      }
    });
};

const categories = (req, res) => {
  const rows = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      try {
        if (rows.length) {
          const values = rows.map((r) => `('${r.name}')`).join(",");
          sql.query(`INSERT INTO categories (name) VALUES ${values}`);
          await log.create({
            name: `Upload files to categories table, total rows added: ${rows.length}`,
          });
          res.status(200).json({ Uploded: true, total: rows.length });
        }
      } catch (error) {
        res.status(500).json({ Uploded: false, error: "Internal Error" });
        console.log(error);
      }
    });
};

module.exports = { customers, suppliers, categories };
