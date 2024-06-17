import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";

export default function BuySellSetLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Admin No", field: "adminno" },
    { title: "Admin Name", field: "adminname" },
    { title: "Buy Limit Fixed Amount AUD", field: "BLFAAUD" },
    { title: "Buy Limit Percentage", field: "BLP" },
    { title: "Sell Limit Percentage", field: "SLP" },
    { title: "Minimum Buy Limit", field: "MBL" },
    { title: "Minimum Sell Limit", field: "MSL" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/buyselllogsetget", {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.rl);
      console.log(json.rl);
    }
    fetchBooks();
  }, []);

  return (
    <div className="statement">
      <h6 className="stath6">{t("Buy and Sell Setting Log")}</h6>
      <div className="MT">
        <MaterialTable
          title="Buy and Sell Setting Log"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
