import { MdOutlineFastfood } from "react-icons/md";
import styles from "./ExpenseItem.module.css";
import deleteIcon from "../../assets/deleteIcon.png";
import editIcon from "../../assets/editIcon.png";

function ExpenseItem({ data }) {
  const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.item}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className={styles.icon}>
          <MdOutlineFastfood />
        </div>
        <div>
          <span style={{ color: "#000000" }}>{data.title}</span>
          <br />g
          <span style={{ color: "#9B9B9B" }}>{formattedDate}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 style={{ color: "#F4BB4A" }}>₹ {data.price}</h3>
        <div>
          <img src={deleteIcon} alt="delete" />
          <img src={editIcon} alt="edit" />
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
