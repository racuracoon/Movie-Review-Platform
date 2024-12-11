import React from "react";
import Header from "../../Component/Header"
import MovieColumn2 from "../../Component/MovieColumn2"

import './Like.css';

const LikePresenter = (props) => {


    return (
        <div className="like">
            <Header />
            <div className="content__wrap">
                <div className="content">
                    <h2>좋아요 목록</h2>
                    <div className="movie__list">
                        {
                            props.movieList.map((movie) => {
                                return (
                                    <div className="movie" key={movie.id} onClick={() => {
                                        window.location = `http://localhost:3000/movieinfo/${movie.id}`;
                                    }}>
                                        <MovieColumn2 movie={movie} key={movie.id} userId={props.userId} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikePresenter;