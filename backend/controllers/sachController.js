const sachModel = require("../model/Sach");

const sachController = {
  getAllSach: async (req, res) => {
    const sachs = await sachModel.find();
    res.status(200).json(sachs);
  },
  createSach: async (req, res) => {
    const newSach = new sachModel(req.body);
    const sach = await newSach.save();
    res.status(201).json(sach);
  },
  updateSach: async (req, res) => {
    const sach = await sachModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(sach);
  },
  deleteSach: async (req, res) => {
    const sach = await sachModel.findByIdAndDelete(req.params.id);
    res.status(200).json(sach);
  },
};

module.exports = sachController;
