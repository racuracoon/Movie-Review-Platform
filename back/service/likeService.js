const pool = require("../db/db");
const tmdbOpenApi = require('../service/tmdbOpenAPI');

// userId로 조회
const findByUserId = async (userId) => {
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };

    try {
        const data = await pool.query("select * from movielike where user_id=?",
            [userId])
        if (data[0].length > 0) {
            msgData.status = 200;
            msgData.message = "성공적으로 불러옴";
            msgData.data = data[0];
        } else {
            msgData.status = 200;
            msgData.message = "데이터가 없음";
            msgData.ok = true;
            msgData.data = data[0];
        }
        return msgData
    } catch (err) {
        console.log(err);
    }
}

// userId와 movieId로 조회
const findOne = async (userId, movieId) => {
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };
    try {
        const data = await pool.query("select * from movielike where user_id=? and movie_id=?",
            [userId, movieId])
        if (data[0].length > 0) {
            msgData.status = 200;
            msgData.message = "좋아요";
            msgData.data = true;
        } else {
            msgData.status = 200;
            msgData.message = "좋아요 아님";
            msgData.ok = true;
            msgData.data = false;
        }
        return msgData
    } catch (err) {
        console.log(err);
    }
}

const create = async (userId, movieId) => {
    let msgData = {
        status: 0,
        ok: false,
        message: "",
    };

    try {
        const data = await pool.query("insert into movielike (user_id, movie_id) values (?,?)",
            [userId, movieId]);
        msgData.status = 200;
        msgData.ok = true;
        msgData.message = "성공적으로 추가";
        return msgData
    } catch (err) {
        console.log("Error:", err);
    }
}

const destroy = async (userId, movieId) => {
    let msgData = {
        status: 0,
        ok: false,
        message: "",
    };
    try {
        const data = await pool.query("delete from movielike where user_id = ? and movie_id=?",
            [userId, movieId]);
        msgData.status = 200;
        msgData.ok = true;
        msgData.message = "성공적으로 삭제";
        return msgData
    } catch (err) {
        console.log("Error:", err);
    }
}

const findLikedMovie = async (userId) =>{
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };
    try{
        const likeList = await findByUserId(userId);
        const data = await Promise.all(likeList.data.map(async (like)=>{
            const movieData = await tmdbOpenApi.getInfo(like.movie_id);
            return movieData.data;
        }))
        if(data.length>0){
            msgData.status = 200;
            msgData.ok = true;
            msgData.message = "성공적으로 불러옴";
            msgData.data = data;
            return msgData
        }else{
            msgData.status = 204;
            msgData.ok = true;
            msgData.message = "데이터가 없음";
            msgData.data = data;
            return msgData
        }
    }catch(err){
        console.log('Error', err);
    }
}

module.exports = {
    findByUserId, findOne, destroy, create, findLikedMovie
}