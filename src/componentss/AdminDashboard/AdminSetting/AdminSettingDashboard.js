import React from "react";
import MemFeeSet from "./MemFeeSet";
import RefPaySet from "./RefPaySet";
import CompSet from "./CompSet";
import BuySellSet from "./BuySellSet";
import CompInpSet from "./CompInpSet";
import "../../../stylesheets/Dashboard.css";

export default function AdminSettingDashboard() {
  return (
    <div className="flex-container">
      <div className="dashboardin">
        <MemFeeSet />
        <RefPaySet />
        <BuySellSet />
        <CompInpSet />
        <CompSet />
      </div>
    </div>
  );
}
