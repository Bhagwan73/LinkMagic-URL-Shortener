

const urlModel = require("../models/urlModel")
const { redis } = require("./redis")
const shortid = require("shortid")


exports.ShortUrl = async (req, res) => {
    try {
        const data = req.body
        const { longUrl } = data
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        if (!urlPattern.test(longUrl)) {
            return res.status(400).send({ status: false, message: "Invalid URL" });
        }

        // Check if the long URL is cached in Redis. If found, return it.
        const redisUrl = await redis.get(longUrl)
        if (redisUrl) {
            return res.status(200).send({ status: true, message: "URL found in Redis cache", "URL": JSON.parse(redisUrl) })
        }

        // Check if the long URL exists in the database, and if the URL exists, store it in Redis.
        const url = await urlModel.findOne({ longUrl: longUrl })
        if (url) {
            const expireTime =600;
            await redis.setex(longUrl, expireTime, JSON.stringify(url))
            return res.status(200).send({ status: true, message: "URL stored in Redis", "URL": url })
        }

        // Generate a short ID for the URL
        const shortId = shortid.generate()
        data['shortId'] = shortId
        const newUrl = await urlModel.create(data)
        return res.status(200).send({ status: true, message: "URL created successfully", "URL": newUrl })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

exports.GetURL = async (req, res) => {
    try {
        const { shortId } = req.params
        if (!shortid.isValid(shortId)) {
            return res.status(400).send({ status: false, message: "Invalid URL Code" })
        }

        // Check if the URL is cached in Redis. If found, return it.
        const URL = await redis.get(shortId)
        if (URL) {
            return res.status(302).redirect(JSON.parse(URL).longUrl)  
        }
        const UrlInfo = await urlModel.findOne({ shortId: shortId }).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        await redis.setex(shortId,600, JSON.stringify(UrlInfo))
        return res.status(302).redirect(UrlInfo.longUrl)

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}   