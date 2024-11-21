const express = require("express");
const router = express.Router();
const theodoimuonsachController = require("../controllers/theodoimuonsachController");

router.get("/", theodoimuonsachController.getAllTheodoimuonsach);

router.get("/:id", theodoimuonsachController.getTheodoimuonsachById);

router.post("/muonsach/", theodoimuonsachController.muonSach);

// router.put("/trasach/", theodoimuonsachController.traSach);

router.delete("/:id", theodoimuonsachController.deleteTheodoimuonsach);

module.exports = router;
