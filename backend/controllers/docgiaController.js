const docgiaModel = require("../model/DocGia");
const bcrypt = require("bcrypt");
const docgiaController = {
  getAllDocGia: async (req, res) => {
    const docgia = await docgiaModel.find();
    res.status(200).json(docgia);
  },
  registerDocGia: async (req, res) => {
    try {
      if (
        !req.body.MaDocGia ||
        !req.body.HoLot ||
        !req.body.Ten ||
        !req.body.NgaySinh ||
        !req.body.Phai ||
        !req.body.DiaChi ||
        !req.body.DienThoai ||
        !req.body.Password
      ) {
        return res.status(400).json("All fields are required");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.Password, salt);

      const newDocGia = new docgiaModel({
        ...req.body,
        Password: hashed,
      });
      const docgia = await newDocGia.save();
      res.status(201).json(docgia);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginDocGia: async (req, res) => {
    try {
      const docgia = await docgiaModel.findOne({
        MaDocGia: req.body.MaDocGia,
      });
      if (!docgia) {
        return res.status(404).json("User not found");
      }
      const validPassword = await bcrypt.compare(
        req.body.Password,
        docgia.Password
      );
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
      if (docgia && validPassword) {
        const { Password, ...others } = docgia._doc;
        return res.status(200).json({ ...others });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateDocGia: async (req, res) => {
    const docgia = await docgiaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(docgia);
  },
  deleteDocGia: async (req, res) => {
    await docgiaModel.findByIdAndDelete(req.params.id);
  },
};

module.exports = docgiaController;
