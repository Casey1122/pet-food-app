import styles from "@/styles/Home.module.css";

function Order() {
  return (
    <div className={styles.orderSection}>
      <h4>Order</h4>
      <div className={styles.titles}>
        <p>Item</p>
        <p>Quantity</p>
        <p>Amount</p>
      </div>
      <div className={styles.itemList}>
        <p>No item yet</p>
      </div>
      <div className={styles.itemCost}>
        <p>TOTAL:</p>
        <p>$0</p>
      </div>
      <hr />
      <div className={styles.buttonGroup}>
        <button>Clear</button>
        <button>Create Order</button>
      </div>
    </div>
  );
}

export default Order;
