import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Signin from './Signin'
import Signup from './Signup'
import List from './List'
import Review from './Review'
import Community from "./Community";
import MovieInfo from "./MovieInfo";
import NewReview from "./NewReivew"
import Like from "./Like"
import UserInfo from "./UserInfo"

const Router = () => {

  return (
    <div className="app">
      <Routes>
        {/*예시*/}
        {/* <Route path="경로" element={</>}> */}
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={<List />} />
        <Route path="/review" element={<Review />} />
        <Route path="/community" element={<Community />} />
        <Route path="/movieinfo/:movieid" element={<MovieInfo />} />
        <Route path="/review/new/:movieid" element={<NewReview />} />
        <Route path="/like/:userid" element={<Like />} />
        <Route path="/userinfo" element={<UserInfo/>} />
      </Routes>
    </div>
  )
}

export default Router;