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

  muonSach: async (req, res) => {
    try {
      const sach = await sachModel.findById(req.params.id);

      if (sach.SoQuyen > 0) {
        const newTheodoimuonsach = new theodoimuonsachModel({
          ...req.body,
          MaSach: req.params.id,
        });
        const savedTheodoimuonsach = await newTheodoimuonsach.save();

        sach.SoQuyen -= 1;
        await sach.save();
        console.log(sach.SoQuyen);
        return res.status(201).json(savedTheodoimuonsach);
      } else {
        return res
          .status(400)
          .json({ message: "Số lượng sách không đủ để mượn" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  traSach: async (req, res) => {
    try {
      const updatedTheodoimuonsach =
        await theodoimuonsachModel.findByIdAndUpdate(
          req.params.id,
          { NgayTra: req.body.NgayTra },
          { new: true }
        );
      const sach = await sachModel.findById(updatedTheodoimuonsach.MaSach);
      sach.SoQuyen += 1;
      await sach.save();

      res.status(200).json(updatedTheodoimuonsach);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

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
