import React from "react";
import Header from "../../Component/Header"

import './Signup.css';

const SignupPresenter = (props) => {


    return (
        <div className="Signup">
            <Header />
            <div className="content">
                <div className="logo">Movie Record</div>
                <div className="signup-form">
                    <input type="text" id="name" placeholder="Name" onChange={(e) => {
                        props.setName(e.target.value);
                    }} />
                    <input type="text" id="email" placeholder="Email" onChange={(e) => {
                        props.setEmail(e.target.value);
                    }} />
                    <input type="password" id="pw" placeholder="Password" onChange={(e) => {
                        props.setPw(e.target.value);
                    }} />
                    <input type="password" id="pw-confirm" placeholder="Password-confirm" onChange={(e) => {
                        props.setPwConfirm(e.target.value);
                    }} />
                    <span className="pw-msg">
                        {props.pwMsg}
                    </span>
                    <button id="signup-btn" onClick={() => {
                        props.signUp()
                    }}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default SignupPresenter;