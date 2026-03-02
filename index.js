const express = require("express");
const mongoose = require("mongoose");
const uploadsRouter = require("./routes/uploads.route");

require("dotenv").config();

const app = express();

app.use("/api/upload", uploadsRouter);

mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Running on port ${process.env.PORT}`),
    );
  })
  .catch((error) => console.log(error));
