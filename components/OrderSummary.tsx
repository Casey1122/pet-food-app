import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Order, useOrderStore } from "@/stores/OrderStore";
import styles from "@/styles/Home.module.css";

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

  // async function getOrderSummary() {
  //   try {
  //     const data = await getDocs(orderSummaryCollectionRef);
  //     setOrderSummary(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  console.log("orderSummary", orderSummary);

  async function getOrderSummary() {
    try {
      const data = await getDocs(orderSummaryCollectionRef);
      const orders = data.docs.map((doc) => ({
        id: doc.id,
        products: doc.data().products,
        created: doc.data().created,
      }));
      setOrderSummary(orders);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddToCurrentOrder(order: Order) {
    clearCurrentOrder();
    setCurrentOrder(order);
  }

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
