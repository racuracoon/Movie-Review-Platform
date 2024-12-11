import React from "react";
import Header from "../../Component/Header"

import './UserInfo.css';

const UserInfoPresenter = (props) => {


    return (
        <div className="userinfo">
            <Header />
            <div className="content__wrap">
                <div className="content">
                    <div className="title"><h2>내 정보</h2></div>
                    <div className="info__con">
                        <>
                            <h4>이름 : {props.name}</h4>
                            <div className="pw-change">
                                <div className="title">비밀번호 변경</div>
                                <input type="password" onChange={(e) => {
                                    props.setPw(e.target.value);
                                }} />
                                <input type="password" onChange={(e) => {
                                    props.setPwConfirm(e.target.value);
                                }} />
                                <button onClick={() => {
                                    props.changePw();
                                }}>제출</button>
                            </div>
                        </>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPresenter;