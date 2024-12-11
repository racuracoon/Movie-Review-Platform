import React from "react";

import './Header.css';

const HeaderPresenter = (props) => {

    return (
        <div className="header">
            <div className="nav">
                <header>
                    <div className="title"><a href="/">Movie Record</a></div>
                    <nav>
                        <a href="/list">영화 목록</a>
                        <a href="/review">영화 리뷰</a>
                        <a onClick={()=>{props.redirectToLikePage()}} className="an">나의 영화</a>
                    </nav>
                    <div className="auth">
                        {props.isSignedIn ? (<>
                            <span className="logout__btn" onClick={() => {
                                props.logout()
                            }}>로그아웃</span>|
                            <span className="userinfo">
                                <a href="/userinfo">내정보</a>
                            </span>
                        </>) : (
                            <>
                                <button className="login__btn" onClick={() => {
                                    window.location = "http://localhost:3000/signin";
                                }}>로그인</button>
                            </>
                        )}
                    </div>
                </header>
            </div>
        </div>
    )
}

export default HeaderPresenter;