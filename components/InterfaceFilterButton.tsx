import styles from "../styles/Home.module.css";
import { handleInterfaceChange } from "@/pages";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";

function InterfaceFilterButton(props: handleInterfaceChange) {
  return (
    <div className={styles.interfaceButton}>
      <input
        type="radio"
        id="New Order"
        name="interface-filter"
        value="New Order"
        defaultChecked
      />
      <label
        htmlFor="New Order"
        onClick={() => props.handleInterfaceChange("New Order")}
      >
        <AiOutlinePlusCircle className={styles.filterIcon} />
        New Order
      </label>
      <input
        type="radio"
        id="View Orders"
        name="interface-filter"
        value="View Orders"
      />
      <label
        htmlFor="View Orders"
        onClick={() => props.handleInterfaceChange("View Orders")}
      >
        <AiOutlineUnorderedList className={styles.filterIcon} />
        View Orders
      </label>
    </div>
  );
}

export default InterfaceFilterButton;
