import React, { useRef, useState } from "react";
import ReactModal from "react-modal";
import styles from "./AddExpenseModal.module.css";


function AddExpenseModal({ showModal, handleCloseModal, setExpenseList }) {
    const [expense, setExpense] = useState({});
    const titleRef = useRef("");
    const priceRef = useRef("");
    const categoryRef = useRef('');
    const dateRef = useRef('');

    function handleSubmit(e){
        e.preventDefault();
        setExpenseList(prevExpense => [...prevExpense, {
            title : titleRef.current.value,
            price : priceRef.current.value,
            category : categoryRef.current.value,
            date : dateRef.current.value
        }]);
        titleRef.current.value = "";
        priceRef.current.value = "";
        categoryRef.current.value = "";
        dateRef.current.value = "";
        handleCloseModal();
     }


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
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: "10px",
            }}
          >
            <input type="text" placeholder="Title" required ref={titleRef}/>
            <input
              type="number"
              placeholder="Price"
              min={0}
              required
              ref={priceRef}
            />
            <select placeholder="Select Category" required ref={categoryRef}>
                <option value="" selected disabled >Select Category</option>
                <option value="entertainment">Entertainment</option>
                <option value="food">Food</option>
                <option value="Travel">Travel</option>
            </select>
            <input type="date" required ref={dateRef}/>
          </div>
          <button type="submit"
              
            >
              Add Expense
            </button>
            <button onClick={handleCloseModal}>Cancel</button>
        </form>      
      </ReactModal>
    </div>
  );
}

export default AddExpenseModal;
