import React from "react";

import './MovieColumn2.css';
import { FaHeart } from 'react-icons/fa';

const MovieColumn2Presenter = (props) => {
 
    return (
        <div className="MovieColumn2">
            <div className="poster">
                {
                    props.like ? (
                        <div className="like" onClick={(event)=>{
                            props.changeLike();
                            event.stopPropagation();
                        }}>
                            <FaHeart />
                        </div>
                    ):(
                        <div className="unlike" onClick={(event)=>{
                            props.changeLike();
                            event.stopPropagation();
                        }}>
                            <FaHeart />
                        </div>
                    )
                }
                <img src={props.posterUrl} alt="" />
            </div>
            <div className="movie-content">
                <div id="title">{props.title}</div>
                <div id="release">{props.release}</div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default MovieColumn2Presenter;