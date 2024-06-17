import React from 'react';
import {Route,Routes} from "react-router-dom";
import Dashboard from './Dashboard.js';
import Main from "./Main.js";
import ErrorPage from "./404.js";

export default function RoutesNav() {
  return (
    <div>
        <section>
                <Routes>
                <Route path="/"  element={<Main/>} />
                <Route path="/login"  element={<Main/>} /> 
                 <Route path="/otp"  element={<Main/>} /> 
                 <Route path="/signup"  element={<Main/>} /> 
                 <Route path="/forgotpassword"  element={<Main/>} />
                 <Route path="/forgotpassword/resetpassword"  element={<Main/>} />  
                 <Route path="/dashboard/member"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/buy"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/sell"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/memberstatement"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/transfer"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/xnalog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/memberlog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/companylog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/audlog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/rateslog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/memberfeesettinglog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/referralpaysettinglog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/companysettinglog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/buysellsettinglog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/companyinputsettinglog"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/adminsetting"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/admin/accountsummary"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/invitemember"  element={<Dashboard/>} /> 
                 <Route path="/dashboard/modifymembersdetails"  element={<Dashboard/>} /> 
                 <Route path="/error"  element={<ErrorPage/>} /> 

                {/* <Route path="/product/:searchItem/:searchCategory" element={<HomeCard/>}  /> */}
                </Routes>
        </section>
    </div>
  )
}