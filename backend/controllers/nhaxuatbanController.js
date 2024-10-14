const nhaxuatbanModel = require("../model/NhaXuatBan");

const nhaxuatbanController = {
  getAllNhaXuatBan: async (req, res) => {
    const nhaxuatbans = await nhaxuatbanModel.find();
    res.status(200).json(nhaxuatbans);
  },
  createNhaXuatBan: async (req, res) => {
    const newNhaXuatBan = new nhaxuatbanModel(req.body);
    const nhaxuatban = await newNhaXuatBan.save();
    res.status(201).json(nhaxuatban);
  },
  updateNhaXuatBan: async (req, res) => {
    const nhaxuatban = await nhaxuatbanModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(nhaxuatban);
  },
  deleteNhaXuatBan: async (req, res) => {
    const nhaxuatban = await nhaxuatbanModel.findByIdAndDelete(req.params.id);
    res.status(200).json(nhaxuatban);
  },
};

module.exports = nhaxuatbanController;
