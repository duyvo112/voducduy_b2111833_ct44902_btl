const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/nhanvienController");

router.get("/", nhanvienController.getAllNhanVien);

router.post("/register", nhanvienController.registerNhanVien);

router.post("/login", nhanvienController.loginNhanVien);

router.put("/:id", nhanvienController.updateNhanVien);

router.delete("/:id", nhanvienController.deleteNhanVien);

module.exports = router;
