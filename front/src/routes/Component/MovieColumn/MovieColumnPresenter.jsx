import React from "react";

import './MovieColumn.css';

const MovieColumnPresenter = (props) => {
 
    return (
        <div className="MovieColumn">
            <div className="poster">
                <img src={props.posterUrl} alt="" />
            </div>
            <div className="content">
                <span id="title">{props.title}</span>
                <span id="release">{props.release}</span>
            </div>
        </div>
    )
}

export default MovieColumnPresenter;