import styles from "@/styles/Home.module.css";

export default function ViewOrderDetails() {
  return (
    <div className={styles.orderSection}>
      <h4>Order</h4>
      <div className={styles.itemList}>
        {/*{currentOrder.length ? currentOrderElement : <p>No item yet</p>}*/}
        <p>No item yet</p>
      </div>
      <div className={styles.itemCost}>
        <p>TOTAL ITEM: {/*{currentOrder.length > 1 ? "pcs" : "pc"}*/}</p>
        <p>TOTAL: $ </p>
        {/*<p>TOTAL: $ {totalAmount.toLocaleString("en-US")}</p>*/}
      </div>
      <hr />
      <div className={styles.buttonGroup}>
        <button>Clear</button>
        <button>Create Order</button>
      </div>
    </div>
  );
}
