const express = require('express');
const router = express.Router();

const apiController = require("../controllers/api.controller");

router.post('/hacker-news/stories', apiController.saveStories)

module.exports = router