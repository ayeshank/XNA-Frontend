import React from "react";
import UsernameCell from "./UsernameCell";
import axios from "axios";
import BASE_URL from "../../config";

const EDIT_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#fff" stroke="#1856bf" transform="translate(2 2)">
      <path
        d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z"
        transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)"
      />
      <path d="m13.5 4.5 1 1" />
    </g>
  </svg>
);
const CANCEL_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" stroke="#dc1e1e" transform="translate(5 5)">
      <path d="m.5 10.5 10-10" />
      <path d="m10.5 10.5-10-10z" />
    </g>
  </svg>
);
const SAVE_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.5 5.5 3 3 8.028-8"
      fill="none"
      stroke="#4caf50"
      transform="translate(5 6)"
    />
  </svg>
);

const styles = {
  select: { margin: "0 20px" },
  buttonsCellContainer: {
    padding: "0 20px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 4,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
  buttonsCellEditorContainer: {
    height: "100%",
    width: "100%",
    display: "inline-flex",
    padding: "0 20px",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    marginRight: 10,
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
  saveButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
};

const getColumns = ({ setRowsData }) => {
  return [
    {
      id: "checkbox",
      visible: true,
      pinned: true,
      width: "54px",
    },
    {
      id: "2",
      field: "refmno",
      label: "Referance No.",
      // cellRenderer: UsernameCell,
      // editorCellRenderer: (props) => <UsernameCell {...props} isEdit />
    },
    {
      id: "3",
      field: "name",
      label: "Name",
    },
    {
      id: "4",
      field: "surname",
      label: "Surname",
    },
    {
      id: "5",
      field: "email",
      label: "Email",
    },
    {
      id: "6",
      field: "phone",
      label: "Phone No.",
    },
    {
      id: "7",
      field: "address",
      label: "Address",
    },
    {
      id: "8",
      field: "postcode",
      label: "Postcode",
    },
    {
      id: "9",
      field: "state",
      label: "State",
    },
    {
      id: "10",
      field: "country",
      label: "Country",
    },
    {
      id: "11",
      field: "bankaccinfo",
      label: "Bank Account",
    },
    {
      id: "12",
      field: "memberno",
      label: "Member No",
    },
    {
      id: "13",
      field: "payAud",
      label: "Investment (AUD)",
    },
    {
      id: "14",
      field: "category",
      label: "Role",
    },
    // {
    //   id: "6",
    //   field: "gender",
    //   label: "Gender",
    //   editorCellRenderer: ({
    //     tableManager,
    //     value,
    //     data,
    //     column,
    //     colIndex,
    //     rowIndex,
    //     onChange
    //   }) => (
    //     <select
    //       style={styles.select}
    //       value={value}
    //       onChange={(e) =>
    //         onChange({ ...data, [column.field]: e.target.value })
    //       }
    //     >
    //       <option>Male</option>
    //       <option>Female</option>
    //     </select>
    //   )
    // },
    {
      id: "buttons",
      width: "max-content",
      pinned: true,
      sortable: false,
      resizable: false,
      cellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
      }) => (
        <div style={styles.buttonsCellContainer}>
          <button
            title="Edit"
            style={styles.editButton}
            onClick={(e) => {
              e.stopPropagation();
              // alert("hello")
              tableManager.rowEditApi.setEditRowId(data.id);
            }}
          >
            {EDIT_SVG}
          </button>
        </div>
      ),
      editorCellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
        onChange,
      }) => (
        <div style={styles.buttonsCellEditorContainer}>
          <button
            title="Cancel"
            style={styles.cancelButton}
            onClick={(e) => {
              e.stopPropagation();
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {CANCEL_SVG}
          </button>
          <button
            title="Save"
            style={styles.saveButton}
            onClick={(e) => {
              e.stopPropagation();
              let rowsClone = [...tableManager.rowsApi.rows];
              let updatedRowIndex = rowsClone.findIndex(
                (r) => r.id === data.id
              );
              rowsClone[updatedRowIndex] = data;
              setRowsData(rowsClone);
              const postData = () => {
                const {
                  _id,
                  id,
                  refmno,
                  name,
                  surname,
                  email,
                  phone,
                  address,
                  postcode,
                  state,
                  country,
                  bankaccinfo,
                  memberno,
                  password,
                  payAud,
                  category,
                  date,
                  prefCurrency,
                } = data;
                var UpdatedMemInfo = {
                  _id,
                  id,
                  refmno,
                  name,
                  surname,
                  email,
                  phone,
                  address,
                  postcode,
                  state,
                  country,
                  bankaccinfo,
                  memberno,
                  password,
                  payAud,
                  category,
                  date,
                  prefCurrency,
                };
                axios
                  .put(`${BASE_URL}/memberinfoupdateadmin`, UpdatedMemInfo)
                  .then((res) => {
                    alert("Updated successfully!");
                  })
                  .catch((err) => {
                    console.log(err.response);
                    alert("An error occurred! Try submitting the form again.");
                  });
              };
              postData();
              console.log(data);
              console.log(data.id);
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {SAVE_SVG}
          </button>
        </div>
      ),
    },
  ];
};

export default getColumns;
