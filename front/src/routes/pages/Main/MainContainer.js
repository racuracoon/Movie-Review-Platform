import React from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import { useState, useEffect } from "react";

const MainContainer = () => {
  const [hotList, sethotList] = useState([])
  const [trailerList, setTrailerList] = useState([]);

  const loadHotList = async () =>{
    try{
      const response = await axios.get('http://localhost:8080/movie/popular')
      sethotList(response.data.data);
    }catch(err){
      console.error("Error:", err);
    }
  }

  const loadTrailer = async () =>{
    try{
      const response = await axios.get('http://localhost:8080/movie/trailer/upcomming')
      const trailerData = [response.data.data[0][0], response.data.data[1][0], response.data.data[2][0]]
      setTrailerList(trailerData);
    }catch(err){
      console.error("Error:", err);
    }
  }

  useEffect(() => {
    loadHotList()
    loadTrailer()
  }, []);
   
  return(
    <MainPresenter hotList={hotList} trailerList={trailerList}/>
  )
}

export default MainContainer;