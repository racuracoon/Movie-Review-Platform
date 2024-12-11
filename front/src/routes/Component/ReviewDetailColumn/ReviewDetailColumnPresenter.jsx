import React from "react";

import './ReviewDetailColumn.css';

const ReviewDetailColumnPresenter = (props) => {

    return (
        <div className="ReviewDetailColumn">
            <div className="writer">
                {props.name}
            </div>
            <hr />
            <div className="desciption">
                {props.description}
            </div>
        </div>
    )
}

export default ReviewDetailColumnPresenter;