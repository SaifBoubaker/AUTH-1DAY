const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./Routes/UserRouter");

mongoose.set("strictQuery", false);

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/users", UserRouter);

mongoose.connect(process.env.DBURL, () => {
  console.log("DB is Connected");
});

app.listen(process.env.URL, () => {
  console.log(`Server is running on ${process.env.URL}`);
});
