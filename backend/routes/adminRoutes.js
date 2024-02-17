const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const usersController = require('../controllers/usersController')
const officersController = require("../controllers/officerController")

router.get("/", adminController.crud_index);
router.get("/users", usersController.user_index);
router.get("/officers", officersController.officers_index);
router.post("/", adminController.crud_create_post);
router.get("/:id", adminController.crud_details);
router.patch("/:id", adminController.crud_update);
router.delete("/:id", adminController.crud_delete);


router.get("/users/:id", usersController.user_details);
router.patch("/users/:id", usersController.user_update);
router.delete("/users/:id", usersController.user_delete);

module.exports = router;
