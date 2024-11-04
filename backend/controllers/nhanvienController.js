const NhanVien = require("../model/NhanVien");
const bcrypt = require("bcrypt");
const nhanvienController = {
  getAllNhanVien: async (req, res) => {
    try {
      const nhanviens = await NhanVien.find();
      res.status(200).json(nhanviens);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  registerNhanVien: async (req, res) => {
    try {
      if (
        !req.body.HoTenNV ||
        !req.body.Password ||
        !req.body.ChucVu ||
        !req.body.DiaChi ||
        !req.body.SoDienThoai ||
        !req.body.Email
      ) {
        return res.status(400).json("All fields are required");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.Password, salt);

      const newNhanVien = new NhanVien({
        ...req.body,
        Password: hashed,
      });
      const nhanvien = await newNhanVien.save();
      res.status(201).json(nhanvien);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginNhanVien: async (req, res) => {
    try {
      const nhanvien = await NhanVien.findOne({
        Email: req.body.Email,
      });
      if (!nhanvien) {
        return res.status(404).json("Nhan Vien not found");
      }
      const validPassword = await bcrypt.compare(
        req.body.Password,
        nhanvien.Password
      );
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
      if (nhanvien && validPassword) {
        const { Password, ...others } = nhanvien._doc;
        return res.status(200).json({ ...others });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateNhanVien: async (req, res) => {
    try {
      const updatedNhanVien = await NhanVien.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedNhanVien);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteNhanVien: async (req, res) => {
    try {
      await NhanVien.findByIdAndDelete(req.params.id);
      res.status(200).json("Nhan Vien deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = nhanvienController;
