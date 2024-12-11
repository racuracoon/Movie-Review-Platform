import React from "react";
import MovieInfoPresenter from "./MovieInfoPresenter";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import getCurrentUser from '../../Services/getCurrentUser'

const MovieInfoContainer = (props) => {
  const { movieid } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const [trailerList, setTrailerList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [myReviewList, setMyReviewList] = useState([]);
  const [userData, setUserData] = useState([]);

  // 영화를 불러옴
  const loadMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movie/info/${movieid}`);
      setMovieInfo(response.data.data)
    } catch (err) {
      console.error("Error:", err);
    }
  }

  // 예고편을 불러옴
  const loadTrailer = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movie/trailer/id/${movieid}`)
      setTrailerList(response.data.data);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const loadMyReview = async (userId) => {
    console.log('loadmyreview')
    try {
      const response = await axios.get(`http://localhost:8080/review/get/userid/${userId}/${movieid}`);
      setMyReviewList(response.data.data);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const loadReveiwExcludeId = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/review/get/userid/exclude/${userId}/${movieid}`);
      setReviewList(response.data.data);
    } catch (err) {
      console.error("Error:", err);
    }

  }

  // 리뷰를 불러옴
  const loadReview = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/review/get/movieid/${movieid}`);
      setReviewList(response.data.data);
    } catch (err) {
      console.error('Error', err);
    }
  }

  useEffect(() => {
    (
      async () => {
        const userData = await getCurrentUser();
        setUserData(userData);
        if(userData.isSignedIn){
          await loadMyReview(userData.userId);
          await loadReveiwExcludeId(userData.userId);
        }else{
          await loadReview();
        }
      }
    )()
    loadMovie();
    loadTrailer();
   
  }, [])
  return (
    <MovieInfoPresenter movieInfo={movieInfo} trailerList={trailerList} movieid={movieid} 
    reviewList={reviewList} myReviewList={myReviewList} userData={userData}/>
  )
}

export default MovieInfoContainer;