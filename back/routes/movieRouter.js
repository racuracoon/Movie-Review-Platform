var express = require("express");
var router = express.Router();

const tmdbOpenApi = require('../service/tmdbOpenAPI');

/**
 * 홈
 */


// 현재 상영중인 영화 
router.get("/nowplaying/:page", async (req, res, next) => {
    const page = req.params.page;
    const response = await tmdbOpenApi.getNowPlaying(page);
    return res.json(response);
})

router.get("/toprated", async (req, res, next)=>{
    const response = await tmdbOpenApi.getTopRated();
})

// 인기 영화
router.get("/popular", async (req, res, next)=>{
    const response = await tmdbOpenApi.getPopular();
    return res.json(response);
})

// 개봉예정 영화 예고편
router.get("/trailer/upcomming", async(req, res, next)=>{
    const response = await tmdbOpenApi.getUpCommingTrailer();
    return res.json(response);
})

// id로 예고편 가져오기
router.get("/trailer/id/:movie_id", async(req, res, next)=>{
    const movie_id = req.params.movie_id;
    const response = await tmdbOpenApi.getTrailer(movie_id);
    return res.json(response);
})

// id로 영화 정보 조회
router.get("/info/:moive_id", async(req, res, next)=>{
    const movie_id = req.params.moive_id;
    const response = await tmdbOpenApi.getInfo(movie_id);
    return res.json(response);
})


module.exports = router;
