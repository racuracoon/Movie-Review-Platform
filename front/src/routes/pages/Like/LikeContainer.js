import React, { useEffect, useState } from "react";
import LikePresenter from "./LikePresenter";
import axios from "axios";
import { useParams } from 'react-router-dom';

const LikeContainer = () => {
    const { userid } = useParams();
    const [movieList, setMovieList] = useState([]);
    
    
    const loadLikeList = async () =>{
        try{
            console.log('uid',userid);
            const response = await axios.get(`http://localhost:8080/like/find/likedmovie/${userid}`);
            console.log(response);
            setMovieList(response.data.data);
        }catch(err){
            console.error("Error:", err);
        }
    }

    useEffect(()=>{
        loadLikeList();
    },[])
    return (
        <LikePresenter movieList={movieList} userId={userid}/>
    )
}

export default LikeContainer;