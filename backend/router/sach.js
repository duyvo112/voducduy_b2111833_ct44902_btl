const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sachController");
const upload = require("../config/multer");

router.get("/", sachController.getAllSach);
// router.post("/upload", upload.single("image"), sachController.uploadImage);
router.post("/create", upload.single("image"), sachController.createSach);
router.put("/:id", upload.single("image"), sachController.updateSach);
router.delete("/:id", sachController.deleteSach);

module.exports = router;
