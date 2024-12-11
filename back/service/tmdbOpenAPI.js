const axios = require('axios')

const API_KEY = `${process.env.API_KEY}`;

// 현재 상영중인 영화 (페이지)
const getNowPlaying = async (page) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/now_playing?language=ko&page=${page}&region=KR`,
        headers: {
            accept: 'application/json',
            Authorization: API_KEY,
        }
    };

    try {
        const res = await axios.request(options);
        msgData.status = 200;
        msgData.message = "성공적으로 불러옴";
        msgData.ok = true;
        msgData.data = res.data;
        return msgData;
    } catch (err) {
        console.log('Error:', err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오는 중 오류가 발생했습니다.";
    }

}

const getTopRated = async () => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1&region=KR',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY,
        }
    };

    axios
        .request(options)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
}

// 현재 인기 영화
const getPopular = async () => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=KR',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY,
        }
    };

    try {
        const res = await axios.request(options);
        msgData.status = 200;
        msgData.message = "성공적으로 불러옴";
        msgData.ok = true;
        msgData.data = res.data.results;
        return msgData;
    } catch (err) {
        console.log('Error:', err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오는 중 오류가 발생했습니다.";
    }
}

// id로 트레일러
const getTrailer = async (movie_id) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=ko`,
        headers: {
            accept: 'application/json',
            Authorization: API_KEY,
        }
    };

    try {
        const res = await axios.request(options);
        if (res.data.results.length > 0) {
            msgData.status = 200;
            msgData.message = "성공적으로 불러옴";
            msgData.ok = true;
            msgData.data = res.data.results
        } else {
            msgData.status = 204;
            msgData.message = "트레일러가 없음";
            msgData.ok = false;
        }
        return msgData;
    } catch (err) {
        console.log('Error:', err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오는 중 오류가 발생했습니다.";
    }
}

// 개봉예정영화 트레일러
const getUpCommingTrailer = async () => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY,
        }
    };

    try {
        const res = await axios.request(options);
        const upCommingList = res.data.results;
        for (const movie of upCommingList) {
            const trailer = await getTrailer(movie.id);
            if (trailer.ok) {
                msgData.data.push(trailer.data);
            }
        }
        return msgData;
    } catch (err) {
        console.log('Error:', err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오는 중 오류가 발생했습니다.";
    }
}

// id로 영화 정보 
const getInfo = async (movie_id) => {
    let msgData = {
        status: 0,
        message: "",
        ok: false,
        data: [],
    };

    const option = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR&region=KR`,
        headers: {
            accept: 'application/json',
            Authorization: API_KEY,
        }
    };

    try {
        console.log('요청 들어옴');
        const res = await axios.request(option);
        msgData.status = 200;
        msgData.message = "성공적으로 불러옴";
        msgData.ok = true;
        msgData.data = res.data;
        return msgData
    } catch (err) {
        console.log('Error:', err);
        msgData.status = 500;
        msgData.message = "데이터를 불러오는 중 오류가 발생했습니다.";
    }

}

module.exports = {
    getNowPlaying, getTopRated, getPopular, getTrailer, getUpCommingTrailer, getInfo
}