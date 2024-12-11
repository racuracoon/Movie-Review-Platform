import React, { useState } from "react";
import Header from "../../Component/Header";

import './Community.css';

const CommunityPresenter = (props) => {

    return (
        <div className="community">
            <Header />
            <div className="container">
                <div className="content__wrap">
                    <h2 className="title">커뮤니티</h2>
                    <div className="content">
                        <div className="community__con">
                            <div className="best">
                                <div className="best__title">실시간 베스트</div>
                                <div className="best__content">
                                    <div className="a"></div>
                                    <div className="a"></div>
                                    <div className="a"></div>
                                    <div className="a"></div>
                                    <div className="a"></div>
                                </div>
                            </div>
                            <button className="new__community-btn">글쓰기</button>
                            <div className="recent">
                                
                            </div>
                        </div>
                        <div className="rightside">
                                <div className="community__search">
                                    <input type="text" className="community-search__input" />
                                    <button className="community-seach__btn"></button>
                                </div>
                                <div className="community-hot">

                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPresenter;