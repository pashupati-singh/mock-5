const express = require("express");
const { connect } = require("./db/db");
const { DoctUserRoutes } = require("./routes/DocUser.Routes");
const { DocProfileRoute } = require("./routes/DoctorProfile.Routes");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/DocUser", DoctUserRoutes);
app.use("/DocProfile", DocProfileRoute);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(process.env.PORT, async () => {
  console.log("server is running");
  try {
    await connect;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
});
