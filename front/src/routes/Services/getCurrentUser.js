import React, { useState } from "react";
import axios from "axios";

const getCurrentUser = async ()=>{
    try{
        const response = await axios.get('http://localhost:8080/user/getUserInfo', { withCredentials:true});
        return response.data
        
    } catch (error){
        console.error("err:", error);
    }
}

export default getCurrentUser;