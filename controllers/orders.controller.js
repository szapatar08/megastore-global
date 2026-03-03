const sql = require("../modules/megastoredb.module");
const log = require("../modules/logmegastore.module");

const get_all_orders = (req, res) => {
  sql.query("SELECT * FROM orders", (error, result) => {
    if (error) {
      return res
        .status(500)
        .send({ Message: "Error during query execution: " + error });
    }
    res.status(200).send(result);
  });
};

const get_one_user = (req, res) => {
  const id = req.params.id;
  sql.query(`SELECT * FROM orders WHERE id=${id}`, (error, result) => {
    if (error) {
      return res
        .status(500)
        .send({ Message: "Error during query execution: " + error });
    }
    res.status(200).send(result);
  });
};

const make_order = (req, res) => {
  const { cortumer_id, product_id, quantity } = req.body;
  sql.query(
    `SELECT price FROM products WHERE id=${product_id}`,
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ Message: "Error during query execution: " + error });
      }
      const totalOrder = result[0].price * quantity;
      sql.query(
        `INSERT INTO orders(customer_id, date, total_order) VALUES (${cortumer_id}, CURRENT_DATE(), ${totalOrder})`,
        (error, result) => {
          if (error) {
            return res
              .status(500)
              .send({ Message: "Error during query execution: " + error });
          }
          const orderID = result.insertId;
          sql.query(
            `INSERT INTO orders_products(order_id, product_id, quantity, total_product) VALUES (${orderID}, ${product_id}, ${quantity}, ${totalOrder})`,
            async (error, respond) => {
              if (error) {
                return res
                  .status(500)
                  .send({ Message: "Error during query execution: " + error });
              }
              await log.create({
                name: `Created order with id ${orderID}`,
              });
              res.status(200).send({ added: true });
            },
          );
        },
      );
    },
  );
};

const delete_order = (req, res) => {
  const order_id = req.params.id;
  sql.query(`DELETE FROM orders WHERE id=${order_id}`, (error, respond) => {
    if (error) {
      return res
        .status(500)
        .send({ Message: "Error during query execution: " + error });
    }
    sql.query(
      `DELETE FROM orders_products WHERE order_id=${order_id}`,
      async (error, respond) => {
        if (error) {
          return res
            .status(500)
            .send({ Message: "Error during query execution: " + error });
        }
        await log.create({
          name: `Delete order with id ${order_id}`,
        });
        res.status(200).send({ deleted: true });
      },
    );
  });
};

const update_order = (req, res) => {
  const { order_id, column, value } = req.params;
  sql.query(
    `UPDATE orders SET ${column} = ${value} WHERE order_id=${order_id}`,
    async (error, respond) => {
      if (error) {
        return res
          .status(500)
          .send({ Message: "Error during query execution: " + error });
      }
      await log.create({
        name: `Update order with id ${order_id} on the column ${column} with the new value ${value}`,
      });
      res.status(200).send({ updated: true });
    },
  );
};

module.exports = {
  get_all_orders,
  get_one_user,
  make_order,
  delete_order,
  update_order,
};
