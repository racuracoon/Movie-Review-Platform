import React from "react";

import './TrailerColumn.css';

const TrailerColumnPresenter = (props) => {
    console.log(props.trailerUrl)
    return (
        <div className="TrailerColumn">
            <div className="trailer">
                <iframe
                    src={props.trailerUrl}
                    frameBorder="0"
                    allowFullScreen
                    className="trailer-iframe"
                ></iframe>
            </div>

            <div id="name">{props.name}</div>

        </div>
    )
}

export default TrailerColumnPresenter;