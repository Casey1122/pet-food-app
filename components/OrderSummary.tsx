import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Order, useOrderStore } from "@/stores/OrderStore";
import styles from "@/styles/Home.module.css";
import { AiOutlinePlus } from "react-icons/ai";

export default function OrderSummary() {
  const [orderSummary, setOrderSummary] = useState<Order[]>([]);
  const orderSummaryCollectionRef = collection(db, "orderSummary");

  const currentOrder = useOrderStore((state) => state.currentOrder);
  const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder);
  const setCurrentOrder = useOrderStore((state) => state.setCurrentOrder);
  const setUniqueCurrentOrder = useOrderStore(
    (state) => state.setUniqueCurrentOrder
  );

  useEffect(() => {
    getOrderSummary();
  }, []);

  async function getOrderSummary() {
    const data = await getDocs(orderSummaryCollectionRef);
    // @ts-ignore
    setOrderSummary(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  function handleAddToCurrentOrder(order: Order) {
    clearCurrentOrder();
    setCurrentOrder(order);
  }

  // console.log("item.products", item.products);
  // console.log("currentOrder", currentOrder);

  const orderSummaryList = orderSummary.map((item, index) => {
    return (
      <div
        key={index}
        className={`${styles.orderSummary} ${
          index % 2 === 0 ? styles.itemDivOdd : styles.itemDiv
        }`}
        onClick={() => {
          handleAddToCurrentOrder(item);
        }}
      >
        <div className={styles.itemName}>
          <p>{item.created.toDate().toLocaleString()}</p>
          <p>ID: {item.id}</p>
        </div>
        <p>Items: {item.products.length}</p>
      </div>
    );
  });

  return (
    <>
      <h4>Order Summary</h4>
      {orderSummaryList}
    </>
  );
}
