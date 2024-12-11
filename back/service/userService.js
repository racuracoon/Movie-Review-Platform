const pool = require("../db/db");

// db에 동일한 email이 존재하는지 확인하는 메서드 
const checkEmailExists = async (email) =>{
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };

    try{
        const data = await pool.query("select * from user where email=?",
            [email])
        if(data[0].length === 0){
            msgData.status = 200;
            msgData.message = "존재하지 않는 email";
            msgData.data = data[0];
        }else{
            msgData.status = 200;
            msgData.message = "존재하는 email";
            msgData.ok = true;
            msgData.data = data[0];
        }
        return msgData
    }catch(err){
        console.log(err);
    }
}

// 회원 추가 메서드 
const add = async (name, email, pw) =>{
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };

    const checkEmailRes = await checkEmailExists(email);
    // 동일한 email이 없다면 회원 추가 
   
    if(checkEmailRes.ok === false){
        try{
            const data = await pool.query('insert into user (name, email, password) values (?, ? ,?)',
                [name, email, pw]);
            msgData.status = 200;
            msgData.ok = true;
            msgData.message = "회원가입이 완료되었습니다.";
        }catch(err){
            console.log(err);
        }
    }else{
        msgData.status = 400;
        msgData.message = "이미 존재하는 email";
    }
    return msgData;
}

//로그인 메서드
const login = async (email, pw) =>{
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };

    try{
        const data = await pool.query('select * from user where email=? and password=?',
            [email, pw]);
        if(data[0].length > 0){
            msgData.status=200;
            msgData.ok = true;
            msgData.message="로그인 성공"
            msgData.data = data[0][0];
        }else if(data[0].length === 0){
            msgData.status=400;
            msgData.message="로그인 실패, 입력정보를 다시 확인해 주세요";
        }
    }catch(err){
        console.log('Error', err)
    }
    return msgData;
}

const findById = async (id) =>{
    let msgData = {
        status: 0,
        ok: false,
        message: "",
        data: [],
    };
    try{
        const data = await pool.query('select * from user where user_id=?', 
            [id]);
        msgData.status = 200;
        msgData.ok = true;
        msgData.message = "성공";
        msgData.data = data[0][0];
        return msgData
    }catch(err){
        console.log('Error:', err)
    }
}

//비밀번호 변경
const changePw = async(pw, id) =>{
    let msgData = {
        status: 0,
        ok: false,
        message: "",
    }
    try{
        const data = await pool.query('update user set password=? where user_id=?',
            [pw, id]);
        if (data[0].affectedRows > 0) {
            msgData.status = 200;
            msgData.message = "비밀번호가 변경되었습니다."
            msgData.ok = true;
            return msgData
        } else {
            msgData.status = 400;
            msgData.message = "비밀번호 변경 실패."
            msgData.ok = false;
            return msgData
        }
    }catch(err){
        console.log("Error:", err);
    }
}

module.exports = {
    add, login, findById, changePw
}