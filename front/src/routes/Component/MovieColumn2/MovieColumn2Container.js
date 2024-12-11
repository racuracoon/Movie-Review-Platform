import React, { useEffect, useState } from "react";
import MovieColumn2Presenter from "./MovieColumn2Presenter";
import axios from "axios";

const MovieColumn2Container = (props) => {
    const movie = props.movie;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title;
    const release = movie.release_date;

    const [like, setLike] = useState(false);
    
    const loadLike = async () =>{
      try{
        const response = await axios.get(`http://localhost:8080/like/find/one/${props.userId}/${movie.id}`);
        setLike(response.data.data);
      }catch(err){
        console.log("Error:", err);
      }
    }

    const changeLike = async () =>{
      if(props.userId === undefined){
        alert("로그인이 필요한 서비스");
        window.location="http://localhost:3000/signin";
      }
      if(like){
        try{
          const response = await axios.get(`http://localhost:8080/like/destroy/${props.userId}/${movie.id}`);
          setLike(false);
        }catch(err){
          console.error("Error:", err);
        }
      }else{
        try{
          const response = await axios.get(`http://localhost:8080/like/add/${props.userId}/${movie.id}`);
          console.log('response', response);
          setLike(true);
        }catch(err){
          console.error("Error:", err);
        }
      }
    }

    useEffect(()=>{
      loadLike();
    },[like])
    

  return(
    <MovieColumn2Presenter posterUrl={posterUrl} title={title} release={release} like={like}
    changeLike={changeLike}
    />
  )
}

export default MovieColumn2Container;