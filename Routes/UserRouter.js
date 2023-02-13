const express = require("express");
const { Register, Login } = require("../Controllers/UserContoller");
const { DataValidation } = require("../MiddleWares/DataValidation");

const router = express.Router();

router.post("/register", DataValidation, Register);
router.post("/login", Login);

module.exports = router;
