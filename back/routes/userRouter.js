var express = require("express");
var router = express.Router();

const userApi = require("../service/userService")

// 회원추가
router.post("/add", async (req, res) => {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const pw = body.pw;

    const response = await userApi.add(name, email, pw);
    console.log(response.message);
    return res.json(response);
});

//로그인
router.post("/login", async (req, res) => {
    const body = req.body;
    const email = body.email;
    const pw = body.pw;

    const response = await userApi.login(email, pw);
    if (response.ok) {
        const user = {
            userId: response.data.user_id,
            name: response.data.name,
        };
        req.session.user = user;
    }
    return res.json(response);
})

//로그아웃
router.post('/logout', (req, res) => {
    req.session.destroy((err) =>{
        if(err){
            return res.status(500).json({message: '로그아웃 중 오류 발생'});
        }
        console.log('세션을 삭제하고 로그아웃 하였습니다.')
        res.clearCookie('connect.sid');
        res.json({message: '로그아웃 성공'});
    })
})

// 로그인 회원정보 불러오기
router.get("/getUserInfo", async (req, res) => {
    if (req.session.user) {
        return res.send({
            isSignedIn: true,
            userId: req.session.user.userId,
            name: req.session.user.name,
        })
    } else {
        return res.send({
            isSignedIn: false,
        })
    }
})

// id로 회원 조회
router.get("/get/userid/:userid", async(req, res, next) =>{
    const userId = req.params.userid;
    const response = await userApi.findById(userId);
    console.log(response);
    res.json(response);
})

// 비밀번호 변경
router.post("/chagepw", async(req, res, next) =>{
    const body = req.body;
    const userId = body.userId;
    const pw = body.pw;
    const response = await userApi.changePw(pw, userId);
    console.log(response);
    res.json(response);
})

module.exports = router;
