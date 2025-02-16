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
import PieChartComponent from "../PieChartComponent/PieChartComponent";
import BarChartComponent from "../BarChartComponent/BarChartComponent";

function ExpenseTracker() {
  const [expenseList, setExpenseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [walletbal, setWalletbal] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const [categorySpends, setCategorySpends] = useState([
    { name: 'Entertainment', value: 0 },
    { name: 'Food', value: 0 },
    { name: 'Travel', value: 0 },
  ]);


  useEffect(()=>{
    if(isMounted){
      localStorage.setItem('expenseList', JSON.stringify(expenseList));
      const total = expenseList.reduce((acc, ele) => acc + Number(ele.price),0);
      setTotalExpense(total);

      const categories = Object.groupBy(expenseList, ({ category }) => category);

      setCategorySpends([ 
        { name: 'Entertainment', value: ((categories.entertainment) ? categories.entertainment.reduce((acc, ele) => acc + Number(ele.price),0) : 0) },
        { name: 'Food', value: ((categories.food) ? categories.food.reduce((acc, ele) => acc + Number(ele.price),0) : 0) },
        { name: 'Travel', value: ((categories.Travel) ? categories.Travel.reduce((acc, ele) => acc + Number(ele.price),0) : 0) }
      ]);
    }
  }, [expenseList]);

  useEffect(()=>{
          const list = localStorage.getItem('expenseList');
          if(!list) localStorage.setItem('expenseList', []);
          else setExpenseList(JSON.parse(list));

          const localwalletbal = localStorage.getItem('walletBalance');
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
    <div style={{ padding: "10px"}}>
      <h1>Expense Tracker</h1>
      <div className={styles.mainWrap}>
        <Card className={styles.innerWrap}>
        <CardContent>
        <h1>
          Wallet Balance: <span style={{color:"#9DFF5B"}}>₹{walletbal}</span>
        </h1>
        </CardContent>
        <CardActions>
        <button className={styles.walletButton} type="button" onClick={handleOpenModal}>+ Add Income</button>
        </CardActions>
        <AddIncomeModal showModal={showModal} handleCloseModal={handleCloseModal} addBalance={addBalance}/>
        </Card>
        <Card className={styles.innerWrap}>
        <CardContent> 
          <h1>
          Expenses: <span style={{color: '#F4BB4A'}}>₹{totalExpense}</span>
          </h1>
        </CardContent>
        <CardActions>
        <button type="button" className={styles.expenseButton} onClick={handleOpenExpenseModal}>+ Add Expense</button>
        </CardActions>
          <AddExpenseModal showModal={showExpenseModal} handleCloseModal={handleCloseExpenseModal} setExpenseList={setExpenseList} updateBalance={setWalletbal}/>
        </Card>
        <div style={{ width: "100%", height: "100%" }}>
        <PieChartComponent data={categorySpends}/>
        </div>
      </div>
      <div style={{display: 'flex', height: '100%', gap: '20px'}}>
        <div style={{width: '50%'}}> 
        <h1>Recent Transactions</h1>
        <TransactionList expenses={expenseList} updateExpenseList={setExpenseList} updateBalance={setWalletbal}/>
        </div>
        <div style={{width: '50%', height : '100%'}}>
        <h1>Top Expenses</h1>
        <div style={{background: 'white', borderRadius: '15px'}}>
        <BarChartComponent data={categorySpends.sort((a,b) => b.value - a.value)}/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
