const sql = require("../modules/megastoredb.module");

const suppliers_analisis = (req, res) => {
  sql.query(
    `
    SELECT s.id, s.name, COUNT(op.product_id) AS items_sell, SUM(op.total_product) AS total_sell
    FROM suppliers s
    INNER JOIN products p
    ON s.id  = p.supplier_id
    INNER JOIN orders_products op
    ON p.id  = op.product_id
    GROUP BY s.id
    ORDER BY items_sell DESC
    `,
    (error, respond) => {
      if (error) {
        return res
          .status(500)
          .send({ Message: "Error during query execution: " + error });
      }
      res.status(200).send(respond);
    },
  );
};

const client_analisis = (req, res) => {
  const { id } = req.body;
  sql.query(
    `
    SELECT c.id , c.name AS costumer_name, p.name AS product_name, o.date, SUM(o.total_order ) AS total_expended
    FROM costumers c
    INNER JOIN orders o
    ON c.id = o.customer_id
    INNER JOIN orders_products op
    ON o.id  = op.order_id
    INNER JOIN products p
    ON op.product_id  = p.id
    GROUP BY c.id, p.name, o.date
    HAVING c.id = ${id}
    `,
    (error, respond) => {
      if (error) {
        return res
          .status(500)
          .send({ Message: "Error during query execution: " + error });
      }
      res.status(200).send(respond);
    },
  );
};

const best_products_category = (req, res) => {
  const { id } = req.body;
  sql.query(
    `
    SELECT p.id, p.name AS product_name, c.name AS category, SUM(op.total_product ) AS total_product
    FROM products p
    INNER JOIN categories c
    ON p.category_id  = c.id
    INNER JOIN orders_products op
    ON p.id = op.product_id
    WHERE c.id = '${id}'
    GROUP BY c.name, p.id
    ORDER BY total_product DESC
    `,
    (error, respond) => {
      if (error) {
        return res
          .status(500)
          .send({ Message: "Error during query execution: " + error });
      }
      res.status(200).send(respond);
    },
  );
};

module.exports = {
  suppliers_analisis,
  client_analisis,
  best_products_category,
};
