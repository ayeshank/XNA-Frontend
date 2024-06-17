import React from 'react';
import Login from './Login';
import '../stylesheets/Main.css';
// import {useNavigate} from "react-router-dom";
import Signup from './Signup';
import OTP from './OTP';
import ForgotPass from './ForgotPass';
import MyChart from './MyChart';
import ForgotPassword from './ForgotPassword/ForgotPassword';

export default function Main() {
  // let navigate = useNavigate();
  return (
    <div className="main">
       <div className="firstdiv">
         {window.location.pathname === "/login" || window.location.pathname === "/" ? <Login/> : ""}
         {window.location.pathname === "/forgotpassword" ? <ForgotPass/> : ""}
         {window.location.pathname === "/otp" ? <OTP/> : ""}
         {window.location.pathname === "/signup" ? <Signup/> : ""}
         {window.location.pathname === "/forgotpassword/resetpassword" ? <ForgotPassword/> : ""}
        </div>
       <div className="seconddiv">
         <MyChart/>
       </div>
    </div>
  )
}
