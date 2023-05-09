import styles from "@/styles/Home.module.css";
import { Order, UniqueCurrentOrder, useOrderStore } from "@/stores/OrderStore";
import { useEffect, useState } from "react";
import { collection } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TfiTrash } from "react-icons/tfi";
import { loadEnvConfig } from "@next/env";
import { number } from "prop-types";

export default function ViewOrderDetails() {
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

  const [displayUniqueOrder, setDisplayUniqueOrder] = useState<
    UniqueCurrentOrder[]
  >([]);

  useEffect(() => {
    setTotalAmount(calculateTotal(currentOrder));
    setUniqueCurrentOrder(currentOrder, uniqueCurrentOrder);
    convertDisplayUniqueOrder(uniqueCurrentOrder);
  }, [currentOrder, displayUniqueOrder]);

  console.log("displayUniqueOrder", displayUniqueOrder);

  function convertDisplayUniqueOrder(orders: UniqueCurrentOrder[]) {
    let uniques: UniqueCurrentOrder[] = [];
    let itemsFound: { [key: number]: boolean } = {};
    for (const order of orders) {
      if (itemsFound[order.product.id]) {
        continue;
      }
      uniques.push(order);
      itemsFound[order.product.id] = true;
    }
    setDisplayUniqueOrder(uniques);
  }

  const currentOrderElement = displayUniqueOrder.map((item, index) => {
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

  return (
    <div className={styles.orderSection}>
      <h4>Order</h4>
      <div className={styles.itemList}>
        {currentOrder.length ? currentOrderElement : <p>No item yet</p>}
      </div>
      <div className={styles.itemCost}>
        <p>TOTAL ITEM: {currentOrder.length > 1 ? "pcs" : "pc"}</p>
        <p>TOTAL: $ {totalAmount.toLocaleString("en-US")}</p>
      </div>
      <hr />
      <div className={styles.buttonGroup}>
        <button>Clear</button>
        <button>Create Order</button>
      </div>
    </div>
  );
}
