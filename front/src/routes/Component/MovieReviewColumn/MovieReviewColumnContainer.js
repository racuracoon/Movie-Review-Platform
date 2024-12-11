import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieReviewColumnPresenter from "./MovieReviewColumnPresenter";

const MovieReviewColumnContainer = (props) => {
  const {writer, star, description, movie_id, review_id} = props.review;
  const userData = props.userData;
  const newDate = new Date(props.review.date);
  const date = `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const [newStar, setNewStar] = useState(star);
  const loadName = async () =>{
    try{
      const response = await axios.get(`http://localhost:8080/user/get/userid/${writer}`);
      setName(response.data.data.name);
    }catch(err){
      console.error('Error:', err);
    }
  }

  const deleteReview = async () =>{
    try{
      const response = await axios.get(`http://localhost:8080/review/delete/${review_id}`)
      console.log(response)
      alert(response.data.message);
      window.location.reload();
    }catch(err){
      console.error("Error:", err);
    }
  }
  
  const changeState = () =>{
    if(isEditing === false) setIsEditing(true);
    else setIsEditing(false);
    setNewDescription(description);
    setNewStar(star);
  }

  const updateReview = async () =>{
    try{
      const response = await fetch('http://localhost:8080/review/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId : review_id,
          description: newDescription,
          star : newStar,
        }),
      });
      if(response.ok){
        const responseData = await response.json();
        alert(responseData.message);
        window.location.reload();
      }
    }catch(err){
      console.error("Error:", err);
    }
    setIsEditing(false);
  }

  useEffect(()=>{
    loadName();
  },[])

  return (
    <MovieReviewColumnPresenter name={name} star={star} description={description} 
    movie_id={movie_id} date={date} userData={userData} deleteReview={deleteReview}
    changeState={changeState} isEditing={isEditing} updateReview={updateReview} 
    newDescription ={newDescription} setNewDescription={setNewDescription} newStar={newStar}
    setNewStar={setNewStar}
    /> 
  )
}

export default MovieReviewColumnContainer;