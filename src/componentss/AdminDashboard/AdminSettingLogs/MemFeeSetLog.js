import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";

export default function MemFeeSetLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "Admin No", field: "adminno" },
    { title: "Admin Name", field: "adminname" },
    { title: "AUD", field: "AUD" },
    { title: "CAD", field: "CAD" },
    { title: "CHF", field: "CHF" },
    { title: "EUR", field: "EUR" },
    { title: "GBP", field: "GBP" },
    { title: "KWD", field: "KWD" },
    { title: "TRY", field: "TRY" },
    { title: "USD", field: "USD" },
    { title: "XNA", field: "XNA" },
    { title: "New Membership Invest", field: "NewMembershipInvest" },
    { title: "Monthly Membership Fee", field: "MonthlyMembershipFee" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/memfeelogsetget", {
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
      <h6 className="stath6">{t("Membership Fee Setting Log")}</h6>
      <div className="MT">
        <MaterialTable
          title="Membership Fee Setting Log"
          columns={columns}
          // icons={tableIcons}
          data={data}
        />
      </div>
    </div>
  );
}
