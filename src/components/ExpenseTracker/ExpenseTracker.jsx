import React, { useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.css";
import ReactModal from 'react-modal';
import AddIncomeModal from "../AddIncomeModal/AddIncomeModal";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";

function ExpenseTracker() {
  const [totalExpense, setTotalExpense] = useState(200);
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  useEffect(()=>{

  },[])

  function handleOpenModal(){
    setShowModal(true);
  }

  function handleCloseModal(){
    setShowModal(false);
  }

  function handleOpenExpenseModal(){
    setShowExpenseModal(true);
  }

  function handleCloseExpenseModal(){
    setShowExpenseModal(false);
  }

  function addBalance(amt){
    const walletbal = localStorage.getItem('walletBalance') || 5000;
    localStorage.setItem('walletBalance', walletbal + amt);
    setShowModal(false);
  }

  return (
    <div style={{ color: "white", padding: "10px"}}>
      <h1>Expense Tracker</h1>
      <div className={styles.mainWrap}>
        <div className={styles.innerWrap}>
          <div>
          Wallet Balance: <span style={{color:"#9DFF5B"}}>₹{localStorage.getItem('walletBalance') || 5000}</span>
          </div>
          <button className={styles.walletButton} type="button" onClick={handleOpenModal}>+ Add Income</button>
          <AddIncomeModal showModal={showModal} handleCloseModal={handleCloseModal} addBalance={addBalance}/>
        </div>
        <div className={styles.innerWrap}>
          <div>
          Expenses: <span style={{color: '#F4BB4A'}}>₹{localStorage.getItem('walletBalance') || 5000}</span>
          </div>
          <button type="button" className={styles.expenseButton} onClick={handleOpenExpenseModal}>+ Add Expense</button>
          <AddExpenseModal showModal={showExpenseModal} handleCloseModal={handleCloseExpenseModal} addBalance={addBalance}/>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
