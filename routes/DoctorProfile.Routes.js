const express = require("express");
const { authMiddleware } = require("../middleware/Auth.middleware");
const { DocProModel } = require("../model/DoctorProfile.model");

const DocProfileRoute = express.Router();
DocProfileRoute.use(authMiddleware);

DocProfileRoute.post("/appointments", async (req, res) => {
  try {
    const Doc = await DocProModel(req.body);
    await Doc.save();
    res.json({ msg: "New profile is added", Doc });
  } catch (error) {
    res.json({ err: error });
  }
});

DocProfileRoute.get("/", async (req, res) => {
  const { specialization } = req.query || "";
  const { sort } = req.query || "asc";
  const { order } = req.query || "";
  const { search } = req.query || "";

  //   if(search){
  //     query
  //   }

  const query = { [sort]: order };
  const value = specialization ? { specialization } : {};

  try {
    const doc = await DocProModel.find(value).sort(query);
    res.json({ msg: doc });
  } catch (error) {
    res.json({ err: error });
  }
});

DocProfileRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await DocProModel.findOne({ _id: id });
    await DocProModel.findByIdAndDelete({ _id: id });
    res.json({ msg: doc });
  } catch (error) {
    res.json({ err: error });
  }
});

DocProfileRoute.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DocProModel.findByIdAndUpdate({ _id: id }, req.body);
    const doc = await DocProModel.findOne({ _id: id });
    res.json({ msg: doc });
  } catch (error) {
    res.json({ err: error });
  }
});

module.exports = { DocProfileRoute };
