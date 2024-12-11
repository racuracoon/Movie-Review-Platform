import React, { useState } from "react";
import Header from "../../Component/Header";
import Media from "../../public/mediaImg.jpg";
import MovieColumn from "../../Component/MovieColumn";
import TrailerColumn from "../../Component/TrailerColumn";
import './Main.css';

const MainPresenter = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0); 

    const moveToSlide = (index) => {
        if (index < 0) {
            setCurrentIndex(3); 
        } else if (index >= 4) {
            setCurrentIndex(0); 
        } else {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="main">
            <Header />
            <div className="content">
                <div className="media">
                    <img src={Media} alt="배경 이미지" />
                   
                </div>

                <div className="popular">
                    <span className="h3">인기 영화 TOP20</span>
                    <div className="slider">
                        <div className="movie__list" style={{ transform: `translateX(-${currentIndex * 930}px)` }}>
                            {
                                props.hotList.map((movie, index) => {
                                    return (
                                        <div key={index} className="movie" onClick={()=>{
                                            window.location = `http://localhost:3000/movieinfo/${movie.id}`;
                                        }}>
                                            <MovieColumn movie={movie} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button id="left__btn" onClick={() => moveToSlide(currentIndex - 1)}>❮</button>
                    <button id="right__btn" onClick={() => moveToSlide(currentIndex + 1)}>❯</button>
                </div>

                <div className="trailer">
                        <span className="h3">최신 트레일러</span>
                        <div className="trailer__list">
                            {
                                props.trailerList.map((trailer)=>{
                                    return(
                                        <div key={trailer.id} className="trailer">
                                            <TrailerColumn trailer={trailer}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </div> 
            </div>
        </div>
    );
}

export default MainPresenter;