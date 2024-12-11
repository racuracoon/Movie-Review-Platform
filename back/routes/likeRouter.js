var express = require("express");
var router = express.Router();

const likeApi = require('../service/likeService');


// like 추가
router.get("/add/:userId/:movieId", async (req, res, next) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const response = await likeApi.create(userId, movieId);
    return res.json(response);
})

// userId로 불러오기
router.get("/find/user/:userId", async(req, res, next)=>{
    const userId = req.params.userId;
    const response = await likeApi.findByUserId(userId);
    return res.json(response);
})

// userId와 movieId로 불러오기
router.get("/find/one/:userId/:movieId", async(req, res, next)=>{
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const response = await likeApi.findOne(userId, movieId);
    return res.json(response);
})

router.get("/destroy/:userId/:movieId", async(req, res, next)=>{
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const response = await likeApi.destroy(userId, movieId);
    return res.json(response);
})

router.get("/find/likedmovie/:userId", async(req, res, next)=>{
    const userId = req.params.userId;
    const response = await likeApi.findLikedMovie(userId);
    return res.json(response);
})

module.exports = router;
