const mongoose = require("mongoose");

const DocGiaSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true, unique: true },
  HoLot: { type: String, required: true },
  Ten: { type: String, required: true },
  NgaySinh: { type: Date, required: true },
  Phai: { type: String, enum: ["Nam", "Nữ"], required: true },
  DiaChi: { type: String, required: true },
  DienThoai: { type: String, required: true },
  Password: { type: String, required: true },
});

const DocGia = mongoose.model("DocGia", DocGiaSchema);
module.exports = DocGia;
