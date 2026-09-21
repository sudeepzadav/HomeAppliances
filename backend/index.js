const express = require("express");
const cors = require("cors");
const ConnectDb = require("./config/ConfigDB");
require("dotenv").config();
const userRouter = require("./router/userRouter")

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("api/v1/user", userRouter);


app.listen(PORT, () => {
    console.log(`Server Started ${PORT}`);
    ConnectDb();
})