import React, { useEffect, useState } from "react";
import HeaderPresenter from "./HeaderPresenter";
import getCurrentUser from "../../Services/getCurrentUser.js";
import axios from "axios";

const HeaderContainer = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({})
  const [userId, setUserId] = useState(0);
  
  // 로그인 상태 여부 확인
  useEffect(()=>{
    (
      async () => {
        const userData = await getCurrentUser();
        setUser(userData)
        setIsSignedIn(userData.isSignedIn);
        setUserId(user.userId);
      }
    )()
  },[])

  const redirectToLikePage = () =>{
    if(isSignedIn){
      window.location = `http://localhost:3000/like/${user.userId}`;
    }else{
      alert('로그인이 필요한 서비스');
      window.location = `http://localhost:3000/signin`;

    }
  }

  //로그아웃
  const logout = async() =>{
    try{
      const response = await axios.post('http://localhost:8080/user/logout', {}, { withCredentials: true }); 
      alert(response.data.message);
      window.location = "http://localhost:3000/";
    }catch(err){
      console.error('Error:', err);
    }
  }

  return(
    <HeaderPresenter isSignedIn={isSignedIn} logout={logout} redirectToLikePage={redirectToLikePage}/>
  )
}

export default HeaderContainer;