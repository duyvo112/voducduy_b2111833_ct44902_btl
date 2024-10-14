const express = require("express");
const router = express.Router();
const theodoimuonsachController = require("../controllers/theodoimuonsachController");

router.get("/", theodoimuonsachController.getAllTheodoimuonsach);

router.post("/muonsach/:id", theodoimuonsachController.muonSach);

router.put("/trasach/:id", theodoimuonsachController.traSach);

router.delete("/:id", theodoimuonsachController.deleteTheodoimuonsach);
module.exports = router;
