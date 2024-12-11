var express = require("express");
var router = express.Router();

const reviewApi = require('../service/reviewService');

/**
 * 홈
 */

router.get("/", async (req, res, next) => {
    const response = await reviewApi.findAll();
    return res.json(response);
});
// 리뷰 추가
router.post("/add", async(req, res, next)=>{
    const body = req.body;
    const writer = body.writer;
    const star = body.star;
    const description = body.description;
    const movieId = body.movieid;
    const response = await reviewApi.addReview(writer, star, description, movieId);

    return res.json(response);
})
// 영화 id로 리뷰 불러오기
router.get("/get/movieid/:movieid", async(req, res, next)=>{
    const movieId = req.params.movieid;
    const response = await reviewApi.findByMovieId(movieId);

    console.log('res', response);
    return res.json(response);
})

// 리뷰 좋아요 불러오기
router.get("/like/:reviewid", async(req, res, next)=>{
    const reviewId = req.params.reviewid;
    const response = await reviewApi.findLike(reviewId);
    console.log('res', response);
    return res.json(response);
})

// 유저 아이디로 리뷰 불러오기
router.get('/get/userid/:userId/:movieId', async(req, res, next)=>{
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const response = await reviewApi.findByUserAndMovieId(userId, movieId);
    return res.json(response);
})

// 유저 아이디를 제외한 리뷰 불러오기
router.get('/get/userid/exclude/:userId/:movieId', async(req, res, next)=>{
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    const response = await reviewApi.findExcludeUserId(userId, movieId);
    return res.json(response);
})
// 리뷰 삭제
router.get('/delete/:reviewId', async(req, res, next)=>{
    const reviewId = req.params.reviewId;
    const response = await reviewApi.deleteById(reviewId);
    return res.json(response);
})
// 리뷰 수정
router.post('/update', async(req, res, next)=>{
    const body = req.body;
    const reviewId = body.reviewId;
    const description = body.description
    const star = body.star
    const response = await reviewApi.update(reviewId, description, star);
    console.log(response);
    return res.json(response);
})
module.exports = router;
