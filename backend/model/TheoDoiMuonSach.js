const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, ref: "DocGia", required: true },
  MaSach: { type: String, ref: "Sach", required: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, required: false },
});

const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  TheoDoiMuonSachSchema
);
module.exports = TheoDoiMuonSach;
