const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, ref: "DocGia", required: true },
  MaSach: [
    {
      MaSach: { type: String, ref: "Sach", required: true },
      TacGia: { type: String, required: true },
      SoLuong: { type: Number, required: true, default: 1 },
      TenSach: { type: String, required: true },
      ImgeUrl: { type: String, required: true },
      DonGia: { type: Number, required: true },
    },
  ],
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, required: false },
  TongTien: { type: Number, required: false },
});

const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  TheoDoiMuonSachSchema
);
module.exports = TheoDoiMuonSach;
