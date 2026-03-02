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

const products = (req, res) => {
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
                `(${r.supplier_id}, ${r.category_id}, '${r.name}', '${r.sku}', ${r.price})`,
            )
            .join(",");
          sql.query(
            `INSERT INTO products (supplier_id, category_id, name, sku, price) VALUES ${values}`,
          );
          await log.create({
            name: `Upload files to products table, total rows added: ${rows.length}`,
          });
          res.status(200).json({ Uploded: true, total: rows.length });
        }
      } catch (error) {
        res.status(500).json({ Uploded: false, error: "Internal Error" });
        console.log(error);
      }
    });
};

const orders = (req, res) => {
  const rows = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      try {
        if (rows.length) {
          const values = rows
            .map((r) => `(${r.customer_id}, '${r.date}', ${r.total_order})`)
            .join(",");
          sql.query(
            `INSERT INTO orders (customer_id, date, total_order) VALUES ${values}`,
          );
          await log.create({
            name: `Upload files to orders table, total rows added: ${rows.length}`,
          });
          res.status(200).json({ Uploded: true, total: rows.length });
        }
      } catch (error) {
        res.status(500).json({ Uploded: false, error: "Internal Error" });
        console.log(error);
      }
    });
};

const orders_products = (req, res) => {
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
                `(${r.order_id}, ${r.product_id}, ${r.quantity}, ${r.total_product})`,
            )
            .join(",");
          sql.query(
            `INSERT INTO orders_products (order_id, product_id, quantity, total_product) VALUES ${values}`,
          );
          await log.create({
            name: `Upload files to orders_products table, total rows added: ${rows.length}`,
          });
          res.status(200).json({ Uploded: true, total: rows.length });
        }
      } catch (error) {
        res.status(500).json({ Uploded: false, error: "Internal Error" });
        console.log(error);
      }
    });
};

module.exports = {
  customers,
  suppliers,
  categories,
  products,
  orders,
  orders_products,
};
