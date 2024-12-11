import React, { useState } from "react";
import "./NewReview.css"
import Header from "../../Component/Header";
import { FaRegStar, FaStar } from 'react-icons/fa';

const NewReivewPresenter = (props) => {
    return (
        <div className="newreview">
            <Header />
            <div className="container">
                <div className="content__wrap">
                    <h2 className="title">리뷰 작성</h2>
                    <div className="content">
                        <div className="review__info">
                            <div className="poster">
                                <img src={props.posterUrl} alt="" />
                            </div>
                            <div className="writer">A review by {props.writer.name}</div>
                            <div className="movie__title">Title : {props.movieTitle}</div>
                        </div>
                        <div className="write__form">
                            <div className="rating">
                                {[...Array(props.star)].map((_, i) => (
                                    <FaStar className="star" key={i} onClick={() => props.setStar(i + 1)} />
                                ))}
                                {[...Array(5 - props.star)].map((_, i) => (
                                    <FaRegStar className="star" key={i} onClick={() => props.setStar(props.star + i + 1)} />
                                ))}
                                &nbsp; {props.star}점
                            </div>
                            <textarea name="" id="" placeholder="이 작품에 대한 생각을 자유롭게 작성해 주세요" onChange={(e) => {
                                props.setDescription(e.target.value);
                            }}></textarea>
                            <button className="submit__btn" onClick={() => {
                                props.addReview();
                            }}>제출</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewReivewPresenter;