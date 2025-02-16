import { MdOutlineFastfood } from "react-icons/md";
import { BsLuggage } from "react-icons/bs";
import { RiMovie2AiLine } from "react-icons/ri";
import styles from "./ExpenseItem.module.css";
import deleteIcon from "../../assets/deleteIcon.png";
import editIcon from "../../assets/editIcon.png";

function ExpenseItem({ data, handleDelete, handleEdit}) {
  const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.item}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className={styles.icon}>
          {(data.category.toLowerCase() === "food") && <MdOutlineFastfood />}
          {(data.category.toLowerCase() === "travel") && <BsLuggage />}
          {(data.category.toLowerCase() === "entertainment") && <RiMovie2AiLine />}
        </div>
        <div>
          <span style={{ color: "#000000" }}>{data.title}</span>
          <br />
          <span style={{ color: "#9B9B9B" }}>{formattedDate}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 style={{ color: "#F4BB4A" }}>₹ {data.price}</h3>
        <div>
          <img src={deleteIcon} alt="delete" style={{cursor:'pointer'}} onClick={handleDelete}/>
          <img src={editIcon} alt="edit" style={{cursor:'pointer'}} onClick={handleEdit}/>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
