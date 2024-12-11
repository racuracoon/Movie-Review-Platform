import React from "react";
import ListPresenter from "./ListPresenter";
import axios from "axios";
import { useEffect, useState } from "react";
import getCurrentUser from "../../Services/getCurrentUser";

const ListContainer = () => { 
  // 최대 5페이지
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [userId, setUserId] = useState(0);

  const loadUserId = async () =>{
    const userData = await getCurrentUser();
    setUserId(userData.userId);
  }

  const loadNowPlaying = async () =>{
    try{
      console.log('page',page);
      const response = await axios.get(`http://localhost:8080/movie/nowplaying/${page}`);
      console.log('res: ',response);
      setMovieList(response.data.data.results);
      console.log("movieList:", movieList)
    }catch(err){
      console.error("Error:",err);
    }
  }

  const increasePage = () =>{
    if(page < 5){
      setPage(page + 1);
    }
  }

  const decreasePage = () =>{
    if(page > 1){
      setPage(page -1);
    }
  }

  useEffect(()=>{
    loadUserId();
    loadNowPlaying();
  }, [page])
   
  return(
    <ListPresenter movieList={movieList} page={page}
    increasePage={increasePage} decreasePage={decreasePage}
    userId ={userId}
    />
  )
}

export default ListContainer;