import React, { useState } from "react";
import ReactModal from "react-modal";
import styles from "./AddExpenseModal.module.css";
import "react-datepicker/dist/react-datepicker.css";

export function AddExpenseForm(){
  return(
    <form>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: "10px",
            }}
          >
            <input type="text" placeholder="Title"/>
            <input
              type="number"
              placeholder="Price"
              min={0}
            />
            <input type="date"/>
          </div>
        </form>
  )
}

function AddExpenseModal({ showModal, handleCloseModal, addBalance }) {
  const [income, setIncome] = useState(0);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItem: "center" }}
    >
      <ReactModal
        isOpen={showModal}
        contentLabel="Inline Styles Modal Example"
        className={styles["income-content"]}
        overlayClassName={styles["income-overlay"]}
      >
        <h1>Add Expense</h1>
        <AddExpenseForm />
        <button
              onClick={(e) => {
                addBalance(parseFloat(income));
              }}
            >
              Add Expense
            </button>
            <button onClick={handleCloseModal}>Cancel</button>
      </ReactModal>
    </div>
  );
}

export default AddExpenseModal;
