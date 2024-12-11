import React from "react";
import Header from "../../Component/Header"
import ReviewColumn from "../../Component/ReviewColumn";

import './Review.css';

const ReviewPresenter = (props) => {
    return (
        <div className="Review">
            <Header />
            <div className="content-wrap">
                <div className="content">
                    <h2>영화 리뷰</h2>
                    <div className="review-wrap">
                        <div className="review-con">
                            {
                                props.movieList.map((movie) => {
                                    return (
                                        <ReviewColumn movie={movie} page={props.page} />
                                    )
                                })
                            }
                            <div className="review-pagecontroller">
                                page: {props.page}
                                <button onClick={()=>{
                                    props.decreasePage()
                                }}>❮</button>
                                <button onClick={()=>[
                                    props.increasePage()
                                ]}>❯</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewPresenter;