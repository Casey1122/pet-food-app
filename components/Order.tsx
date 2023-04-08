import styles from "@/styles/Home.module.css";
import { useCurrentOrderStore } from "@/stores/OrderStore";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { TfiTrash } from "react-icons/tfi";

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
  const incrementItem = useCurrentOrderStore((state) => state.incrementItem);
  const decrementItem = useCurrentOrderStore((state) => state.decrementItem);
  const removeItem = useCurrentOrderStore((state) => state.removeItem);

  useEffect(() => {
    calculateTotal();
    setUniqueCurrentOrder(currentOrder, uniqueCurrentOrder);
  }, [currentOrder]);

  // console.log("currentOrder", currentOrder);
  // console.log("uniqueCurrentOrder", uniqueCurrentOrder);

  const currentOrderElement = uniqueCurrentOrder.map((item, index) => {
    return (
      <div key={index} className={styles.orderItem}>
        <div className={styles.itemTitle}>
          <p>{item.product.name_tc}</p>
          <p>
            ( ID: {item.product.id} ) - {item.product.name_en}
          </p>
        </div>
        <div className={styles.quantityBox}>
          <AiOutlineMinus
            className={styles.quantityButton}
            onClick={() => decrementItem(item.product.id, currentOrder)}
          />
          <p>
            {item.quantity}
            {item.quantity > 1 ? " pcs" : " pc"}
          </p>
          <AiOutlinePlus
            className={styles.quantityButton}
            onClick={() => incrementItem(item.product.id, currentOrder)}
          />
          <TfiTrash
            className={styles.removeButton}
            onClick={() => removeItem(item.product.id, currentOrder)}
          />
        </div>
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
      <div className={styles.itemList}>
        {currentOrder.length ? currentOrderElement : <p>No item yet</p>}
      </div>
      <div className={styles.itemCost}>
        <p>
          TOTAL ITEM: {currentOrder.length}{" "}
          {currentOrder.length > 1 ? "pcs" : "pc"}
        </p>
        <p>TOTAL: $ {totalAmount.toLocaleString("en-US")}</p>
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
