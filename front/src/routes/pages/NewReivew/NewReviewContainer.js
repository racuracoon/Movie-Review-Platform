import React from "react";
import NewReviewPresenter from "./NewReviewPresenter";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import getCurrentUser from "../../Services/getCurrentUser";

const NewReviewContainer = () => {
  const { movieid } = useParams();
  const [movieTitle, setMovieTitle] = useState([]);
  const [posterUrl, setPosterUrl] = useState('');
  const [writer, setWriter] = useState('');
  const [description, setDescription] = useState('');
  const [star, setStar] = useState(5);

  // 해당 영화 정보 불러오기


  // 리뷰 제출 
  const addReview = async () => {
    if(description.length < 3){
      alert('리뷰 본문은 3글자 이상이어야 합니다.');
    }else{
      try {
        const response = await fetch(`http://localhost:8080/review/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            writer: writer.userId,
            movieid: movieid,
            star: star,
            description: description,
          })
        })
        if(response.ok){
          const responseData = await response.json();
          console.log(responseData);
          alert(responseData.message);
          if(responseData.status === 200){
            window.location =`http://localhost:3000/movieinfo/${movieid}`;
          }else{
            console.error('Error:', response.status);
          }
        }
      } catch (err) {
        console.error("Error:", err)
      }
    }
  }



  useEffect(() => {

    // 영화 불러오기
    const loadMovie = async () => {
      try {
        const userData = await getCurrentUser();
        setWriter(userData);
        if (userData.isSignedIn) {
          const response = await axios.get(`http://localhost:8080/movie/info/${movieid}`);
          setMovieTitle(response.data.data.title);
          setPosterUrl(`https://image.tmdb.org/t/p/w500${response.data.data.poster_path}`);
        } else {
          alert("로그인이 필요한 서비스입니다.")
          window.location = "http://localhost:3000/signin";
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
    loadMovie();
  }, [])

  return (
    <NewReviewPresenter movieTitle={movieTitle} posterUrl={posterUrl}
      setDescription={setDescription} writer={writer} addReview={addReview}
      star={star} setStar={setStar}
    />
  )
}

export default NewReviewContainer;