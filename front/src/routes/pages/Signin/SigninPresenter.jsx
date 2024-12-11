import React from "react";
import Header from "../../Component/Header"

import './Signin.css';

const SigninPresenter = (props) => {


    return (
        <div className="Signin">
            <Header />
            <div className="content">
                <div className="logo">Movie Record</div>
                <div>
                    <form className="signin-form">
                        <input type="text" id="email" placeholder="Email" onChange={(e) => {
                            props.setEmail(e.target.value);
                        }} />
                        <input type="password" id="pw" placeholder="Password" onChange={(e) => {
                            props.setPw(e.target.value)
                        }} />
                        <button id="signin-btn" onClick={() => {
                            props.Signin()
                        }}>로그인</button>
                        <span>
                            계정이 없으신가요?<a href="signup">회원가입</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SigninPresenter;