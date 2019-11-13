const router = require("express").Router();
const dbRoutes = require("./database");
const authRoutes = require('./auth-routes');
const fileUploadRoutes = require('./file');
const geoFile = require("./geocode");


router.use("/database", dbRoutes);
router.use("/auth", authRoutes);
router.use("/file", fileUploadRoutes);
router.use("/geocode", geoFile);


module.exports = router;
