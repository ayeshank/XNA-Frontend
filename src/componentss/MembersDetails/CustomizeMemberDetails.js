import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";
import "../../stylesheets/CustomizeMemberDetails.css";
import BASE_URL from "../../config.js";
// import "./styles.css";

export default function CustomizeMemberDetails() {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/memberinfoget`, {
        credentials: "include",
      });
      const json = await response.json();
      setLoading(true);
      setTimeout(() => {
        setRowsData(json.mi);
        console.log(json.mi);
        setLoading(false);
      }, 1500);
    }
    fetchBooks();
  }, []);

  return (
    <div className="ModifyMD">
      <h6 className="stath6">Members Details</h6>
      <GridTable
        columns={getColumns({ setRowsData })}
        rows={rowsData}
        isLoading={isLoading}
        onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
          !isEdit &&
          tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
          tableManager.rowSelectionApi.toggleRowSelection(data.id)
        }
      />
    </div>
  );
}
