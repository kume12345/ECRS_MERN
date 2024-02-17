const express = require("express");
const router = express.Router();
const officerController = require("../controllers/officerController");

router.get("/", officerController.officers_index);
router.get("/:id", officerController.officers_details);
router.patch("/:id", officerController.officers_update);

module.exports = router;