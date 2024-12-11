import React from "react";
import UserInfoPresenter from "./UserInfoPresenter";
import { useEffect, useState } from "react";
import getCurrentUser from "../../Services/getCurrentUser";

const UserInfo = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [pwMsg, setPwMsg] = useState("");
    const [userId, setUserId] = useState(0);

    const changePw = async () => {
        try{
            console.log('uid',userId);
            const response = await fetch('http://localhost:8080/user/chagepw', {
                method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: userId,
                    pw: pw,
                  }),
            })
            if(response.ok){
                const responseData = await response.json();
                console.log(responseData.ok);
                alert(responseData.message);
              }else{
                console.error('Error:', response.status);
              };
        }catch(err){
            console.error("Error:", err);
        }
    }

    useEffect(() => {
        if (pw !== "" && pwConfirm !== "") {
            if (pw.length < 5) {
                setPwMsg("비밀번호는 5글자 이상 입력해야 합니다.")
            }
            else {
                if (pw === pwConfirm) {
                    setPwMsg("비밀번호가 일치 합니다.");
                } else {
                    setPwMsg("비밀번호가 일치 하지않습니다.");
                }
            }
        } else {
            setPwMsg("");
        }
    }, [pw, pwConfirm])

    useEffect(() => {
        (
            async () => {
                const userData = await getCurrentUser();
                if (userData.isSignedIn === false) {
                    alert("로그인이 필요한 서비스입니다.");
                    window.location ='http://localhost:3000/signin';
                } else {
                    setName(userData.name);
                    setUserId(userData.userId);
                }
            }
        )()
    }, [])

    return (
        <UserInfoPresenter
            setPw={setPw} setPwConfirm={setPwConfirm} pwMsg={pwMsg}
            name={name} changePw={changePw}
        />
    )
}

export default UserInfo;
