import React, { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";

function TransactionList({expenses, updateExpenseList, updateBalance}){
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState([]);


    function handleDelete(id){
        const item = expenses.find(ele => ele.id === id);
        updateBalance(prevBal => prevBal + Number(item.price))
        const updatedList = expenses.filter(ele => ele.id !== id);
        updateExpenseList(updatedList);
    }

    function handleEdit(id){
        const item = expenses.filter(ele => ele.id === id);
        setEditItem(item);
        setShowEditModal(true);
    }

    function handleCloseEditModal(){
        setEditItem([]);
        setShowEditModal(false);
    }
    
    return(
        <div className={styles['recent-transaction']}>
        {
          (expenses.length === 0) ?  <span style={{color: "black"}}>No Transactions!</span> : 
          expenses.map((ele) => (
            <ExpenseItem  data={ele} key={ele.id} handleDelete={()=> handleDelete(ele.id)} handleEdit={()=> handleEdit(ele.id)}/>
          ))
        }
        <AddExpenseModal showModal={showEditModal} handleCloseModal={handleCloseEditModal} setExpenseList={updateExpenseList} transaction={editItem} updateBalance={updateBalance}/>
      </div>
    )
}

export default TransactionList;