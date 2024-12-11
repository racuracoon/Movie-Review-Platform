import React from "react";
import SignupPresenter from "./SignupPresenter";
import { useEffect, useState } from "react";

const SignupContainer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  //비밀번호 일치 여부 확인
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

  // Server로 회원가입 요청
  const signUp = async () => {
    if (name !== "" && email !== "" && pw !== "" && pwConfirm !== "") {
      if (name.length >= 3) {
        if (email.length >= 5) {
          if (pw === pwConfirm) {
            if (pw.length >= 5) {
              try {
                const response = await fetch('http://localhost:8080/user/add', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: name,
                    email: email,
                    pw: pw,
                  }),
                });
                const responseData = await response.json();
                alert(responseData.message);
                window.location = "http://localhost:3000/signin";


              } catch (err) {
                console.error('Reqest failed', err);
              }
            } else {
              alert("비밀번호는 5글자 이상 입력해야 합니다.")
            }
          } else {
            alert("비밀번호가 일치하지 않습니다.")
          }
        } else {
          alert("이메일은 5글자 이상 입력해야 합니다.")
        }
      } else {
        alert("이름은 3글자 이상 입력해야 합니다.")
      }
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  }

  return (
    <SignupPresenter setName={setName} setEmail={setEmail}
      setPw={setPw} setPwConfirm={setPwConfirm} pwMsg={pwMsg}
      signUp={signUp}
    />
  )
}

export default SignupContainer;
