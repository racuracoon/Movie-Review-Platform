import React from "react";
import Header from "../../Component/Header"
import MovieColumn2 from "../../Component/MovieColumn2"
import './List.css';

const ListPresenter = (props) => {
    return (
        <div className="list">
            <Header />
            <div className="content-wrap">
                <div className="content">
                    <h2>영화 목록</h2>
                    <div className="movie-list-wrap">
                        <div className="movie-list">
                            {
                                props.movieList.map((movie) => {
                                    return (
                                        <div className="movie" key={movie.id} onClick={()=>{
                                            window.location = `http://localhost:3000/movieinfo/${movie.id}`;
                                        }}>
                                            <MovieColumn2 movie={movie} key={movie.id} userId={props.userId} />
                                        </div>
                                    )
                                })
                            }
                            <div className="list-pagecontroller">
                                page {props.page}
                                <button onClick={()=>{
                                    props.decreasePage();
                                }}>❮</button>
                                <button onClick={()=>{
                                    props.increasePage();
                                }}>❯</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPresenter;