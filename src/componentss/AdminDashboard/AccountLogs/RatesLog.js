import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../../stylesheets/Statement.css";
import { useTranslation } from "react-i18next";
import BASE_URL from "../../../config";

export default function AdminRatesLog() {
  const { t } = useTranslation();
  const [data, setData] = useState([]); //table data
  var columns = [
    { title: "id", field: "_id", hidden: true },
    { title: "Date", field: "date" },
    { title: "AUD", field: "AUD" },
    { title: "CAD", field: "CAD" },
    { title: "CHF", field: "CHF" },
    { title: "EUR", field: "EUR" },
    { title: "GBP", field: "GBP" },
    { title: "KWD", field: "KWD" },
    { title: "TRY", field: "TRY" },
    { title: "USD", field: "USD" },
    { title: "XNA", field: "XNA" },
  ];

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/rateslogget`, {
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
      <h6 className="stath6">{t("Rates Description")}</h6>
      <div className="MT">
        <MaterialTable title="Rates Log" columns={columns} data={data} />
      </div>
    </div>
  );
}
