const express = require("express");
const router = express.Router();
const docgiaController = require("../controllers/docgiaController");
router.get("/", docgiaController.getAllDocGia);

router.post("/register", docgiaController.registerDocGia);

router.post("/login", docgiaController.loginDocGia);

router.put("/:id", docgiaController.updateDocGia);

router.delete("/:id", docgiaController.deleteDocGia);

module.exports = router;
