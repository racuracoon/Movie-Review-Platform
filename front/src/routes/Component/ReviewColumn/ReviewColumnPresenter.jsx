import React from "react";
import './ReviewColumn.css';
import ReviewDetailColumn from "../ReviewDetailColumn";

const ReviewColumnPresenter = (props) => {
    return (
        <div className="ReviewColumn">
            <div className="movie-poster">
                <img src={props.posterUrl} alt="" />
            </div>
            <div className="ReviewColumn-content">
                <div className="h3">{props.title}</div>
                <div className="link"><a href={props.link}>리뷰 더보기</a></div>
                <div className="review-detail-wrap">
                    {   
                        props.reviewList.map((review) => {
                            return (
                                <ReviewDetailColumn review={review} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewColumnPresenter;