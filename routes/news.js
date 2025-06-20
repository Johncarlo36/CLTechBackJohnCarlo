const express = require("express");
const newsController = require("../controllers/news");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

//[SECTION] Activity: Routing Component
const router = express.Router();

//[SECTION] Activity: Route for creating a news
router.post("/", verify, verifyAdmin, newsController.addNews);

//[SECTION] Activity: Route for retrieving all news
router.get("/all", verify, verifyAdmin, newsController.getAllNews);

//[SECTION] Activity: Route for retrieving all active news
router.get("/", newsController.getAllActive);

//[SECTION] Activity: Route for retrieving a specific news
router.get("/specific/:newsId", newsController.getNews);

//[SECTION] Activity: Route for updating a news (Admin)
router.patch("/:newsId", verify, verifyAdmin, newsController.updateNews);

//[SECTION] Activity: Route to archiving a news (Admin)
// router.patch("/:newsId/archive", verify, verifyAdmin, newsController.archiveNews);

//[SECTION] Activity: Route to activating a news (Admin)
// router.patch("/:newsId/activate", verify, verifyAdmin, newsController.activateNews);

//[SECTION] Activity: Export Route System
// Allows us to export the "router" object that will be accessed in our "index.js" file
module.exports = router;