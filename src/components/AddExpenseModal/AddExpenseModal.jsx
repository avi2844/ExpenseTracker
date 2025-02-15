import React, { useRef, useState, useEffect} from "react";
import ReactModal from "react-modal";
import styles from "./AddExpenseModal.module.css";
import { useSnackbar } from 'notistack';


function AddExpenseModal({ showModal, handleCloseModal, setExpenseList, transaction, updateBalance}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [expense, setExpense] = useState({
    id:"",
    title: "",
    price: "",
    category: "",
    date: ""
});

useEffect(() => {
  if (Array.isArray(transaction) && transaction.length > 0) {
    setExpense(transaction[0]); 
  } else {
    setExpense({ id: "", title: "", price: "", category: "", date: "" });
  }
}, [transaction]);

function handleChange(e) {
  setExpense({ ...expense, [e.target.name]: e.target.value });
}

    function handleSubmit(e) {
      e.preventDefault();
      const currLocalbalance = Number(localStorage.getItem('walletBalance'));
      if(currLocalbalance < expense.price){
        enqueueSnackbar("The price cannot be more than wallet balance", {variant: "warning"});
        return
      }
      setExpenseList(prevExpense => {
        if (transaction) {
          return prevExpense.map(exp => 
            exp.id === transaction[0].id ? { ...expense, id: transaction[0].id } : exp
          );
        } else {
          return [...prevExpense, { ...expense, id: Math.floor(Math.random() * Date.now()) }];
        }
      });
      if(!transaction) updateBalance(prevBal => prevBal - expense.price);
      else {
        const currPrice = transaction[0].price;
        updateBalance(prevBal => prevBal + Number(currPrice) - Number(expense.price));
      }
      setExpense({ id: "", title: "", price: "", category: "", date: "" });
      if(transaction) handleCloseModal();
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
        {(transaction) ? <h1>Edit Expense</h1> : <h1>Add Expense</h1>}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: "10px",
            }}
          >
            <input type="text" placeholder="Title" name="title" required value={expense.title} onChange={handleChange} />
            <input
              type="number"
              placeholder="Price"
              min={0}
              required
              name="price"
              value={expense.price}
              onChange={handleChange}
            />
            <select placeholder="Select Category" required name="category" value={expense.category} onChange={handleChange} >
                <option value="" disabled >Select Category</option>
                <option value="entertainment">Entertainment</option>
                <option value="food">Food</option>
                <option value="Travel">Travel</option>
            </select>
            <input type="date" required name="date" value={expense.date} onChange={handleChange}/>
          </div>
          <button type="submit">
          {transaction ? "Update Expense" : "Add Expense"}
            </button>
            <button type="button" onClick={handleCloseModal}>Cancel</button>
        </form>      
      </ReactModal>
    </div>
  );
}

export default AddExpenseModal;
