const express = require("express");
const mongoose = require("mongoose");
const uploadsRouter = require("./routes/uploads.route");
const ordersRouter = require("./routes/orders.route");
const queriesRouter = require("./routes/queries.route");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/upload", uploadsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/queries", queriesRouter);

mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Running on port ${process.env.PORT}`),
    );
  })
  .catch((error) => console.log(error));
