const theodoimuonsachModel = require("../model/TheoDoiMuonSach");
const sachModel = require("../model/Sach");

const theodoimuonsachController = {
  getAllTheodoimuonsach: async (req, res) => {
    try {
      const theodoimuonsachs = await theodoimuonsachModel.find();
      res.status(200).json(theodoimuonsachs);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getTheodoimuonsachById: async (req, res) => {
    try {
      const theodoimuonsach = await theodoimuonsachModel.find({
        MaDocGia: req.params.id,
      });
      res.status(200).json(theodoimuonsach);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  muonSach: async (req, res) => {
    try {
      const newTheodoimuonsach = new theodoimuonsachModel({
        MaSach: req.body.MaSach,
        MaDocGia: req.body.MaDocGia,
        NgayMuon: req.body.NgayMuon,
        NgayTra: req.body.NgayTra,
        TongTien: req.body.TongTien,
      });

      const savedTheodoimuonsach = await newTheodoimuonsach.save();

      for (const maSach of req.body.MaSach) {
        if (maSach.SoLuong <= 0) {
          return res
            .status(400)
            .json({ message: "Số lượng sách không hợp lệ" });
        } else {
          const sach = await sachModel.findById(maSach.MaSach);
          if (sach && sach.SoQuyen >= maSach.SoLuong) {
            sach.SoQuyen -= maSach.SoLuong;
            await sach.save();
          } else {
            return res.status(400).json({ message: "Sách đã hết" });
          }
        }
      }

      res.status(201).json(savedTheodoimuonsach);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  // traSach: async (req, res) => {
  //   try {
  //     const updatedTheodoimuonsach =
  //       await theodoimuonsachModel.findByIdAndUpdate(Ma);
  //     const sach = await sachModel.findById(updatedTheodoimuonsach.MaSach);
  //     sach.SoQuyen += 1;
  //     await sach.save();

  //     res.status(200).json(updatedTheodoimuonsach);
  //   } catch (error) {
  //     res.status(500).json({ message: "Lỗi server", error });
  //   }
  // },

  deleteTheodoimuonsach: async (req, res) => {
    try {
      const deletedTheodoimuonsach =
        await theodoimuonsachModel.findByIdAndDelete(req.params.id);

      if (!deletedTheodoimuonsach) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy theo dõi mượn sách" });
      }

      res.status(200).json({ message: "Xóa theo dõi mượn sách thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
};

module.exports = theodoimuonsachController;
