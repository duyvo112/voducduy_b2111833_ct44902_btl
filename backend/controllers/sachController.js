const sachModel = require("../model/Sach");

const sachController = {
  getAllSach: async (req, res) => {
    const sachs = await sachModel.find();
    res.status(200).json(sachs);
  },
  getSachById: async (req, res) => {
    const sach = await sachModel.findById(req.params.id);
    res.status(200).json(sach);
  },
  uploadImage: async (req, res) => {
    try {
      if (req.file) {
        res.status(200).json({ path: `/${req.file.path}` });
        console.log("tải ảnh về backend", `/${req.file.path}`);
      } else {
        res.status(400).json({ message: "No file uploaded" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
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
