import styles from "../styles/Home.module.css";
import { handleInterfaceChange } from "@/pages";

function InterfaceFilterButton(props: handleInterfaceChange) {
  return (
    <div className={styles.interfaceButton}>
      <input
        type="radio"
        id="New Order"
        name="interface-filter"
        value="New Order"
      />
      <label
        htmlFor="New Order"
        onClick={() => props.handleInterfaceChange("New Order")}
      >
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
        View Orders
      </label>
    </div>
  );
}

export default InterfaceFilterButton;
