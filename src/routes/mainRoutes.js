const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

const categoryRoutes = require('./categoryRoutes');
const furnitureRoutes = require('./furnitureRoutes');

//define the routes
router.use("/category", categoryRoutes);
router.use("/furniture", furnitureRoutes);
router.use("/user", userRoutes);

module.exports = router;