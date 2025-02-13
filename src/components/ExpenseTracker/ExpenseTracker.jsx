import React, { useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.css";
import ReactModal from 'react-modal';
import AddIncomeModal from "../AddIncomeModal/AddIncomeModal";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function ExpenseTracker() {
  const [expenseList, setExpenseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  console.log(expenseList);

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
        <Card className={styles.innerWrap}>
        <CardContent>
        <div>
          Wallet Balance: <span style={{color:"#9DFF5B"}}>₹{localStorage.getItem('walletBalance') || 5000}</span>
        </div>
        </CardContent>
        <CardActions>
        <button className={styles.walletButton} type="button" onClick={handleOpenModal}>+ Add Income</button>
        </CardActions>
        <AddIncomeModal showModal={showModal} handleCloseModal={handleCloseModal} addBalance={addBalance}/>
        </Card>
        <Card className={styles.innerWrap}>
        <CardContent> 
          <div>
          Expenses: <span style={{color: '#F4BB4A'}}>₹{localStorage.getItem('walletBalance') || 5000}</span>
          </div>
        </CardContent>
        <CardActions>
        <button type="button" className={styles.expenseButton} onClick={handleOpenExpenseModal}>+ Add Expense</button>
        </CardActions>
          <AddExpenseModal showModal={showExpenseModal} handleCloseModal={handleCloseExpenseModal} setExpenseList={setExpenseList}/>
        </Card>
      </div>
    </div>
  );
}

export default ExpenseTracker;
