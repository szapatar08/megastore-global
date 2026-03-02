const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mega_store_global:mymegastoredatabase@logs.io8wmks.mongodb.net/?appName=logs",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
