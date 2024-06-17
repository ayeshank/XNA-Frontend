import React from "react";
import XNARates from "./XNARates";
import "../stylesheets/Dashboard.css";
import MemberInformation from "./MemberInformation";
import Summary from "./Summary";
import PrefferedCurrency from "./PrefferedCurrency/PrefferedCurrency";

export default function DashboardIn() {
  return (
    <div className="flex-container">
      <div className="dashboardin">
        <MemberInformation />
        <Summary />
        <XNARates />
        <PrefferedCurrency />
      </div>
    </div>
  );
}
