const router = require("express").Router();

const authController = require("../controllers/authcontroller");
const userController = require("../controllers/usercontroller");

router.patch("/update-me", authController.protect, userController.updateMe);

module.exports = router;

