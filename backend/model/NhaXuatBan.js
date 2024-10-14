const mongoose = require("mongoose");

const NhaXuatBanSchema = new mongoose.Schema({
  MaNXB: { type: String, required: true, unique: true },
  TenNXB: { type: String, required: true },
  DiaChi: { type: String, required: true },
});

const NhaXuatBan = mongoose.model("NhaXuatBan", NhaXuatBanSchema);
module.exports = NhaXuatBan;
