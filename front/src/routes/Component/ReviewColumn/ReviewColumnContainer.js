import React, { useEffect, useState } from "react";
import ReviewColumnPresenter from "./ReviewColumnPresenter";
import axios from "axios";

const ReviewColumnContainer = (props) => {
    const movie = props.movie;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title;
    const [reviewList, setReviewList] = useState([]);
    const link = `http://localhost:3000/movieinfo/${movie.id}`;

    const loadReview = async () =>{
        try{
            const response = await axios.get(`http://localhost:8080/review/get/movieid/${movie.id}`);
            setReviewList(response.data.data.slice(0, 3));
            console.log('tilte',title);
            console.log('movie.id');
            console.log('response', response.data.data);
        }catch(err){
            console.error("Error:", err);
        }
    }

    useEffect(()=>{
        loadReview();
    }, [props.page, movie.id])

    return (
        <ReviewColumnPresenter posterUrl={posterUrl} title = {title} reviewList={reviewList} link={link}/>
    )
}

export default ReviewColumnContainer;