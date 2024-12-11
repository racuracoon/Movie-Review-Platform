const pool = require("../db/db");
const userAPI = require("./userService");

const findAll = async () => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };
    try {
        const data = await pool.query('select * from review');
        const reviewList = await Promise.all(data[0].map(async (data) => {
            const writer = await userAPI.findFromId(data.writer);
            const reviewData = {
                review_id: data.review_id,
                writer: writer.data.name,
                star: data.star,
                description: data.description,
            }
            return reviewData
        }))

        msgData.status = 200;
        msgData.message = '성공적으로 불러옴';
        msgData.ok = true;
        msgData.data = reviewList;
        return msgData;
    } catch (err) {
        console.log(err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오는 중 오류가 발생했습니다.";
    }
}

const addReview = async (writer, star, description, movieId) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
    };
    try {
        const data = await pool.query('insert into review (writer, star, description, movie_id, date) values (?,?,?,?, NOW())',
            [writer, star, description, movieId])
        if (data[0].affectedRows > 0) {
            msgData.status = 200;
            msgData.message = "리뷰가 추가 되었습니다."
            msgData.ok = true;
            return msgData
        } else {
            msgData.status = 400;
            msgData.message = "리뷰가 추가 실패."
            msgData.ok = false;
            return msgData
        }
    } catch (err) {
        console.log(err)
        msgData.status = 500;
        msgData.message = "데이터를 추가하던 중 오류가 발생했습니다.";
    }
}

const update = async (reviewId, description, star) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
    }
    try {
        const data = await pool.query('update review set description=?, star=? where review_id =?',
            [description, star, reviewId]);
        msgData.status = 200;
        msgData.message = "리뷰가 수정되었습니다.";
        msgData.ok = true;
    } catch (err) {
        console.log("Error:", err);
        msgData.status = 500;
        msgData.message = "리뷰 수정중 오류발생.";
    }
    return msgData
}

const findByUserAndMovieId = async (userId, movieId) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };
    try {
        const data = await pool.query(`select * from review where writer = ? and movie_id=?`,
            [userId, movieId]);
        if (data[0].length > 0) {
            msgData.status = 200;
            msgData.message = "성공적으로 불러옴"
            msgData.ok = true;
            msgData.data = data[0];
        } else {
            msgData.status = 204;
            msgData.message = "데이터가 없음"
            msgData.ok = true;
            msgData.data = data[0];
        }
        return msgData;
    } catch (err) {
        console.log("Error:", err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오던중 오류 발생";
    }
}

// 해당 아이디만 제외하고 불러오기
const findExcludeUserId = async (userId, movieId) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };
    try {
        const data = await pool.query(`select * from review where writer != ? and movie_id=?`,
            [userId, movieId]);
        if (data[0].length > 0) {
            msgData.status = 200;
            msgData.message = "성공적으로 불러옴"
            msgData.ok = true;
            msgData.data = data[0];
        } else {
            msgData.status = 204;
            msgData.message = "데이터가 없음"
            msgData.ok = true;
            msgData.data = data[0];
        }
        return msgData;
    } catch (err) {
        console.log("Error:", err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오던중 오류 발생";
    }
}

const findByMovieId = async (movieId) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };
    try {
        const data = await pool.query('select * from review where movie_id=?',
            [movieId]);
        if (data[0].length > 0) {
            msgData.status = 200;
            msgData.message = "성공적으로 불러옴"
            msgData.ok = true;
            msgData.data = data[0];
        } else {
            msgData.status = 204;
            msgData.message = "데이터가 없음"
            msgData.ok = true;
            msgData.data = data[0];
        }
        return msgData;
    } catch (err) {
        console.log("Error:", err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오던중 오류 발생";
    }
}

const deleteById = async (reviewId) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
    };
    try {
        const [result] = await pool.query('delete from review where review_id=?',
            [reviewId]);
        if (result.affectedRows > 0) {
            msgData.status = 200;
            msgData.message = "리뷰가 성공적으로 삭제되었습니다.";
            msgData.ok = true;
        } else {
            msgData.status = 404;
            msgData.message = "리뷰를 찾을 수 없습니다.";
        }
    } catch (err) {
        console.error('Error:', err);
        msgData.status = 500;
        msgData.message = "리뷰 삭제중 오류 발생";
    }
    return msgData;
}

module.exports = {
    findAll, addReview, findByMovieId, findByUserAndMovieId, findExcludeUserId, deleteById, update
}