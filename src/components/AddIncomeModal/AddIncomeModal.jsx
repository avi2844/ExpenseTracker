import React, { useState } from "react";
import ReactModal from "react-modal";
import styles from "./AddIncomeModal.module.css"

function AddIncomeModal({showModal, handleCloseModal, addBalance}) {
    const [income, setIncome] = useState(0);

    function changeHandler(e){
        setIncome(e.target.value);
    }
  return (
    <div style={{display : 'flex', justifyContent: 'center', alignItem: 'center'}}>
        <ReactModal
      isOpen={showModal}
      contentLabel="Inline Styles Modal Example"
      className={styles['income-content']} 
      overlayClassName={styles['income-overlay']}
    >
      <h1>Add Balance</h1>
      <input type="number" min={0} onChange={changeHandler}/>
      <button onClick={(e) => {addBalance(parseFloat(income))}}>Add Balance</button>
      <button onClick={handleCloseModal}>Cancel</button>
    </ReactModal>
    </div>
    
  );
}

export default AddIncomeModal;
