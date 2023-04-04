import styles from "@/styles/Home.module.css";
import { useCurrentOrderStore } from "@/stores/OrderStore";

function Order() {
  const currentOrder = useCurrentOrderStore((state) => state.currentOrder);
  const clearCurrentOrder = useCurrentOrderStore(
    (state) => state.clearCurrentOrder
  );

  const currentOrderElement = currentOrder.map((item, index) => {
    return (
      <div key={index}>
        <p>{item.name_tc}</p>
        <p>{item.name_en}</p>
        <p>{item.price}</p>
      </div>
    );
  });

  return (
    <div className={styles.orderSection}>
      <h4>Order</h4>
      <div className={styles.titles}>
        <p>Item</p>
        <p>Quantity</p>
        <p>Amount</p>
      </div>
      <div className={styles.itemList}>
        {currentOrder ? currentOrderElement : <p>No item yet</p>}
      </div>
      <div className={styles.itemCost}>
        <p>TOTAL:</p>
        <p>$0</p>
      </div>
      <hr />
      <div className={styles.buttonGroup}>
        <button onClick={clearCurrentOrder}>Clear</button>
        <button>Create Order</button>
      </div>
    </div>
  );
}

export default Order;
