import React, { useEffect, useState } from "react";
import ReviewDetailColumnPresenter from "./ReviewDetailColumnPresenter";
import axios from "axios";

const ReviewDetailColumnContainer = (props) => {
    const { writer, description} = props.review;
    const [name, setName] = useState('');
    const loadName = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/get/userid/${writer}`);
            setName(response.data.data.name);
        } catch (err) {
            console.error('Error:', err);
        }
    }
    useEffect(()=>{
        loadName();
    }, [])
    return (
        <ReviewDetailColumnPresenter name={name} description={description}/>
    )
}

export default ReviewDetailColumnContainer;