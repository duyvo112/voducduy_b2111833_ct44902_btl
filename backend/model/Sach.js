const mongoose = require("mongoose");

const SachSchema = new mongoose.Schema({
  MaSach: { type: String, required: true, unique: true },
  TenSach: { type: String, required: true },
  DonGia: { type: Number, required: true },
  SoQuyen: { type: Number, required: true },
  NamXuatBan: { type: Number, required: true },
  MaNXB: { type: String, ref: "NhaXuatBan", required: true },
  NguonGoc: { type: String, required: true },
});

const Sach = mongoose.model("Sach", SachSchema);
module.exports = Sach;
