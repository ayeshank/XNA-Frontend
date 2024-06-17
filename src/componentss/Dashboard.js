import React from 'react'
import Sidebar from './Sidebar';
import '../stylesheets/Dashboard.css';
import DashboardIn from './DashboardIn';
import BuySell from './BuySell/BuySell';
import Statement from './MemberStatement/Statement';
import CurrencyTag from './CurrencyTag/CurrencyTag';
import Transfer from './Transfer/Transfer';
import XNALog from './AdminDashboard/AccountLogs/XNALog';
import MemberLog from './AdminDashboard/AccountLogs/MemberLog';
import CompanyLog from './AdminDashboard/AccountLogs/CompanyLog';
import AUDLog from './AdminDashboard/AccountLogs/AUDLog';
import RatesLog from './AdminDashboard/AccountLogs/RatesLog';
import MemFeeSetLog from './AdminDashboard/AdminSettingLogs/MemFeeSetLog';
import RefPaySetLog from './AdminDashboard/AdminSettingLogs/RefPaySetLog';
import CompSetLog from './AdminDashboard/AdminSettingLogs/CompSetLog';
import BuySellSetLog from './AdminDashboard/AdminSettingLogs/BuySellSetLog';
import CompInpSetLog from './AdminDashboard/AdminSettingLogs/CompInpSetLog';
import AccountSummary from './AdminDashboard/AccountSummary';
import AdminSettingDashboard from './AdminDashboard/AdminSetting/AdminSettingDashboard';
import InviteMember from './InviteMembers/InviteMember';
import CustomizeMemberDetails from './MembersDetails/CustomizeMemberDetails';

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* <div className="DivForPC">
      <CurrencyTag/>
      </div> */}
    {window.location.pathname === "/dashboard/member"  ? <> <DashboardIn/></> : ""}
     {window.location.pathname === "/dashboard/buy"  ? <> <BuySell/></> : ""}
     {window.location.pathname === "/dashboard/sell"  ? <> <BuySell/></> : ""}
     {window.location.pathname === "/dashboard/memberstatement"  ? <> <Statement/></> : ""}
     {window.location.pathname === "/dashboard/transfer"  ? <> <Transfer/></> : ""}
     {window.location.pathname === "/dashboard/admin/accountsummary"  ? <> <AccountSummary/></> : ""}
     {window.location.pathname === "/dashboard/admin/xnalog"  ? <> <XNALog/></> : ""}
     {window.location.pathname === "/dashboard/admin/memberlog"  ? <> <MemberLog/> </> : ""}
     {window.location.pathname === "/dashboard/admin/companylog"  ? <> <CompanyLog/></> : ""}
     {window.location.pathname === "/dashboard/admin/audlog"  ? <> <AUDLog/></> : ""}
     {window.location.pathname === "/dashboard/admin/rateslog"  ? <> <RatesLog/></> : ""}
     {window.location.pathname === "/dashboard/admin/memberfeesettinglog"  ? <>  <MemFeeSetLog/> </> : ""}
     {window.location.pathname === "/dashboard/admin/referralpaysettinglog"  ? <>  <RefPaySetLog/> </> : ""}
     {window.location.pathname === "/dashboard/admin/companysettinglog"  ? <>  <CompSetLog/> </> : ""}
     {window.location.pathname === "/dashboard/admin/buysellsettinglog"  ? <>  <BuySellSetLog/> </> : ""}
     {window.location.pathname === "/dashboard/admin/companyinputsettinglog"  ? <>  <CompInpSetLog/> </> : ""}
     {window.location.pathname === "/dashboard/admin/adminsetting"  ? <>  <AdminSettingDashboard/>   </> : ""}
     {window.location.pathname === "/dashboard/invitemember"  ? <>  <InviteMember/>   </> : ""}
     {window.location.pathname === "/dashboard/modifymembersdetails"  ? <>  <CustomizeMemberDetails/>  </> : ""}
     </div>
  )
}
