
const express = require("express")
const route = express.Router()
const { ShortUrl, GetURL } = require("../controller/UrlController")

route.post("/shortURL",ShortUrl)
route.get('/:shortId',GetURL)

module.exports = route;