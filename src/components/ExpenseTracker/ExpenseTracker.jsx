import React, { useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.css";
import ReactModal from 'react-modal';
import AddIncomeModal from "../AddIncomeModal/AddIncomeModal";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import TransactionList from "../TransactionList/TransactionList";

function ExpenseTracker() {
  const [expenseList, setExpenseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [walletbal, setWalletbal] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    if(isMounted){
      localStorage.setItem('expenseList', JSON.stringify(expenseList));
      const total = expenseList.reduce((acc, ele) => acc + Number(ele.price),0);
      setTotalExpense(total);
    }
  }, [expenseList]);

  useEffect(()=>{
          const list = localStorage.getItem('expenseList');
          if(!list) localStorage.setItem('expenseList', []);
          else setExpenseList(JSON.parse(list));

          const localwalletbal = localStorage.getItem('walletBalance');
          console.log(localwalletbal);
          setWalletbal((localwalletbal) ? localwalletbal : 5000);
          setIsMounted(true);
        },[])

  useEffect(() => {
    if(isMounted){
      localStorage.setItem('walletBalance', walletbal);
    }
  }, [walletbal]);

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
    const localwalletbal = localStorage.getItem('walletBalance');
    localStorage.setItem('walletBalance', Number(localwalletbal) + amt);
    setWalletbal(Number(localwalletbal) + amt);
    setShowModal(false);
  }

  return (
    <div style={{ color: "white", padding: "10px"}}>
      <h1>Expense Tracker</h1>
      <div className={styles.mainWrap}>
        <Card className={styles.innerWrap}>
        <CardContent>
        <div>
          Wallet Balance: <span style={{color:"#9DFF5B"}}>₹{walletbal}</span>
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
          Expenses: <span style={{color: '#F4BB4A'}}>₹{totalExpense}</span>
          </div>
        </CardContent>
        <CardActions>
        <button type="button" className={styles.expenseButton} onClick={handleOpenExpenseModal}>+ Add Expense</button>
        </CardActions>
          <AddExpenseModal showModal={showExpenseModal} handleCloseModal={handleCloseExpenseModal} setExpenseList={setExpenseList} updateBalance={setWalletbal}/>
        </Card>
      </div>
      <h1>Recent Transactions</h1>
      <TransactionList expenses={expenseList} updateExpenseList={setExpenseList} updateBalance={setWalletbal}/>
    </div>
  );
}

export default ExpenseTracker;
