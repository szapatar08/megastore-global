const express = require("express");
const mongoose = require("mongoose");
const uploadsRouter = require("./routes/uploads.route");

const app = express();

app.use("/api/upload", uploadsRouter);

mongoose
  .connect(
    "mongodb+srv://mega_store_global:mymegastoredatabase@logs.io8wmks.mongodb.net/?appName=logs",
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Running on port 3000"));
  })
  .catch((error) => console.log(error));
