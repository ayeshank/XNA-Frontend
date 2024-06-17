import React from 'react'
import BuySellRates from './BuySellRates';
import '../../stylesheets/Dashboard.css';
import BuyRatesLimit from './BuyRatesLimit';
import BuyAmount from './BuyAmount';
import SellRatesLimit from './SellRatesLimit';
import SellAmount from './SellAmount';


export default function BuySell() {
  return (
    <div className="dashboardin">
        {window.location.pathname === "/dashboard/buy" ? <> <BuyAmount/><BuyRatesLimit/></> : ""}
        {window.location.pathname === "/dashboard/sell" ? <><SellAmount/><SellRatesLimit/></> : ""}
      <BuySellRates/>
    </div>
  )
}
