const express = require("express");
const router = express.Router();
const controller = require("../controllers/furnitureController");

router.get('/:fid', controller.selectById);
router.get('/:categoryid/furniture', controller.selectByIdWithCategoryInfo);

module.exports = router;