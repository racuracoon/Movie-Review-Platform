import React from "react";
import SigninPresenter from "./SigninPresenter";
import { useState } from "react";

const SigninContainer = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // Server에 로그인 요청
  const Signin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:email,
          pw: pw,
        }),
        credentials: "include",
      });
      if(response.ok){
        const responseData = await response.json();
        console.log(responseData.ok);
        alert(responseData.message);
        if(responseData.ok){
          window.location = "http://localhost:3000/";
        }
      }else{
        console.error('Error:', response.status);
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <SigninPresenter setEmail={setEmail} setPw={setPw} Signin={Signin} />
  )
}

export default SigninContainer;