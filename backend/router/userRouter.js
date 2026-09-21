const express = require("express");
const { SignUp, login, getMe } = require("../controller/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", login);
router.get("/me", auth, getMe);

module.exports = router;