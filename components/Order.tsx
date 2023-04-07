import styles from "@/styles/Home.module.css";
import { useCurrentOrderStore } from "@/stores/OrderStore";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

function Order() {
  /* ==================== VALUE FROM STORE ==================== */
  const currentOrder = useCurrentOrderStore((state) => state.currentOrder);
  const clearCurrentOrder = useCurrentOrderStore(
    (state) => state.clearCurrentOrder
  );
  const totalAmount = useCurrentOrderStore((state) => state.totalAmount);
  const setTotalAmount = useCurrentOrderStore((state) => state.setTotalAmount);
  const uniqueCurrentOrder = useCurrentOrderStore(
    (state) => state.uniqueCurrentOrder
  );
  const setUniqueCurrentOrder = useCurrentOrderStore(
    (state) => state.setUniqueCurrentOrder
  );

  useEffect(() => {
    calculateTotal();
    setUniqueCurrentOrder(currentOrder, uniqueCurrentOrder);
  }, [currentOrder]);

  // console.log("currentOrder", currentOrder);
  console.log("uniqueCurrentOrder", uniqueCurrentOrder);

  const currentOrderElement = uniqueCurrentOrder.map((item, index) => {
    return (
      <div key={index} className={styles.orderItem}>
        <div className={styles.itemTitle}>
          <p>{item.product.name_tc}</p>
          <p>{item.product.name_en}</p>
        </div>
        <p className={styles.quantityBox}>
          <AiOutlineMinus className={styles.quantityButton} />
          {item.quantity}
          {item.quantity > 1 ? " pcs" : " pc"}
          <AiOutlinePlus className={styles.quantityButton} />
        </p>
        <p>${item.product.price}</p>
      </div>
    );
  });

  function calculateTotal() {
    const result = currentOrder
      .map((item) => item.price)
      .reduce((accumulator, current) => accumulator + current, 0);
    setTotalAmount(result);
  }

  return (
    <div className={styles.orderSection}>
      <h4>Order</h4>
      <div className={styles.titles}>
        <p>Item</p>
        <p>Quantity</p>
        <p>Amount</p>
      </div>
      <div className={styles.itemList}>
        {currentOrder.length ? currentOrderElement : <p>No item yet</p>}
      </div>
      <div className={styles.itemCost}>
        <p>
          TOTAL ITEM: {currentOrder.length}{" "}
          {currentOrder.length > 1 ? "pcs" : "pc"}
        </p>
        <p>TOTAL: ${totalAmount}</p>
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
