const express = require("express");
const router = express.Router();
const nhaxuatbanController = require("../controllers/nhaxuatbanController");

router.get("/", nhaxuatbanController.getAllNhaXuatBan);

router.post("/create", nhaxuatbanController.createNhaXuatBan);

router.put("/:id", nhaxuatbanController.updateNhaXuatBan);

router.delete("/:id", nhaxuatbanController.deleteNhaXuatBan);

module.exports = router;
