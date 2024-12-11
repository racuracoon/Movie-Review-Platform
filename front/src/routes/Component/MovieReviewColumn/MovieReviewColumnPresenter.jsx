import React from "react";

import './MovieReviewColumn.css';
import { FaRegStar, FaStar } from 'react-icons/fa';

const MoiveReviewCoulmnPresenter = (props) => {
    console.log('newStar', props.newStar);
    console.log('Star', props.star);

    return (
        <div className="movieReview__coulmn">
            <div className="review__info">
                <span className="name">{props.name}님의 리뷰</span>
                <span className="date">{props.date}</span>
            </div>
            {
                props.isEditing ?
                    <div className="newstar">
                        {[...Array(props.newStar)].map((_, i) => (
                            <FaStar className="star" key={i} onClick={() => props.setNewStar(i + 1)} />
                        ))}
                        {[...Array(5 - props.newStar)].map((_, i) => (
                            <FaRegStar className="star" key={i} onClick={() => props.setNewStar(props.newStar + i + 1)} />
                        ))}
                    </div>
                    :
                    <div className="star">
                        {[...Array(props.star)].map((_, i) => (
                            <FaStar className="star-lg" key={i} />
                        ))}
                        {[...Array(5 - props.star)].map((_, i) => (
                            <FaRegStar className="star-lg" key={i} />
                        ))}
                    </div>
            }


            {
                props.isEditing ?
                    <>
                        <div className="description"><textarea name="" id="" value={props.newDescription} onChange={(e) => {
                            props.setNewDescription(e.target.value);
                        }} className="newdescription"></textarea></div>
                        <div className="update">
                            <button className="update__btn" onClick={() => {
                                props.changeState();
                            }}>취소</button>
                            <button className="delete__btn" onClick={() => {
                                props.updateReview();
                            }}>제출</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="description">{props.description}</div>
                        {
                            props.userData.length === 0 ?
                                <div></div>
                                :
                                <div className="update">
                                    <button className="update__btn" onClick={() => {
                                        props.changeState();
                                    }}>수정</button>
                                    <button className="delete__btn" onClick={() => {
                                        props.deleteReview();
                                    }}>삭제</button>
                                </div>
                        }
                    </>
            }
        </div>
    )
}

export default MoiveReviewCoulmnPresenter;