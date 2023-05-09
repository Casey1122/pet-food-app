import styles from "@/styles/Home.module.css";
import { Product, useOrderStore } from "@/stores/OrderStore";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { TfiTrash } from "react-icons/tfi";

import { db } from "@/firebaseConfig";
import { collection, addDoc, Timestamp } from "@firebase/firestore";

function NewOrderDetails() {
  /* ==================== VALUE FROM STORE ==================== */
  const currentOrder = useOrderStore((state) => state.currentOrder);
  const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder);
  const totalAmount = useOrderStore((state) => state.totalAmount);
  const setTotalAmount = useOrderStore((state) => state.setTotalAmount);
  const uniqueCurrentOrder = useOrderStore((state) => state.uniqueCurrentOrder);
  const setUniqueCurrentOrder = useOrderStore(
    (state) => state.setUniqueCurrentOrder
  );
  const incrementItem = useOrderStore((state) => state.incrementItem);
  const decrementItem = useOrderStore((state) => state.decrementItem);
  const removeItem = useOrderStore((state) => state.removeItem);
  const calculateTotal = useOrderStore((state) => state.calculateTotal);

  const orderSummaryCollectionRef = collection(db, "orderSummary");

  const [buttonText, setButtonText] = useState("Create Order");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTotalAmount(calculateTotal(currentOrder));
    setUniqueCurrentOrder(currentOrder, uniqueCurrentOrder);
  }, [currentOrder]);

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

  async function handleCreateOrder(currentOrder: Product[]) {
    if (currentOrder.length === 0) {
      return;
    }
    setIsLoading(true);
    setButtonText("Submitting...");
    const data = {
      products: currentOrder,
      created: Timestamp.fromDate(new Date()),
    };
    await addDoc(orderSummaryCollectionRef, data);
    clearCurrentOrder();
    setButtonText("Submitted");
    setTimeout(() => setButtonText("Create Order"), 3000);
    setIsLoading(false);
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
        <button
          onClick={() => handleCreateOrder(currentOrder)}
          disabled={isLoading}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default NewOrderDetails;
