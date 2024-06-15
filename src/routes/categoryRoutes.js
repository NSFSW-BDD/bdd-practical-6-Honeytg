const express = require("express");
const router = express.Router();
const controller = require ("../controllers/categoryController");

router.get('/', controller.readAllCategory);
router.post('/', controller.createNewCategory);

module.exports = router;