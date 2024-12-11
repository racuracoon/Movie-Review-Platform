import React from "react";
import ReviewPresenter from "./ReviewPresenter";
import axios from "axios";
import { useState, useEffect } from "react";

const ReviewContainer = () => {
    const [reviewList, setReviewList] = useState([]);
    const [page, setPage] = useState(1);
    const [movieList, setMovieList] = useState([]);

    // 최초 렌더링시 현재 상영중인 영화 띄워줌 
    const loadNowPlaying = async () => {
        try {
            console.log('시작', ((page-1)*5)%20)
            console.log('끝', (((page-1)*5)+5)%20)

            const response = await axios.get(`http://localhost:8080/movie/nowplaying/${Math.floor(page/4)+1}`);
            console.log('res:', response);
            setMovieList(response.data.data.results.slice(((page-1)*5)%20, ((page-1)*5)%20+5));
            console.log("movieList:", movieList)
        } catch (err) {
            console.error("Error:", err);
        }
    }

    // 페이지 
    const increasePage = () =>{
        if(page < 15){
            setPage(page+1);
        }
    }
    const decreasePage = () =>{
        if(page > 1){
            setPage(page-1);
        }
    }

    useEffect(() => {
        loadNowPlaying();
    }, [page])

    return (
        <ReviewPresenter reviewList={reviewList} movieList={movieList} increasePage={increasePage} 
        decreasePage={decreasePage} page={page}/>
    )
}

export default ReviewContainer;