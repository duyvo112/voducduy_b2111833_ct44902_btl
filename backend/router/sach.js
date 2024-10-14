const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sachController");

router.get("/", sachController.getAllSach);
router.post("/create", sachController.createSach);
router.put("/:id", sachController.updateSach);
router.delete("/:id", sachController.deleteSach);

module.exports = router;
