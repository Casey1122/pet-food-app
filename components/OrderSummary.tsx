import { db } from "@/firebaseConfig";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  OrderByDirection,
} from "@firebase/firestore";
import { Order, useOrderStore } from "@/stores/OrderStore";
import styles from "@/styles/Home.module.css";
import { CgArrowsExchangeV } from "react-icons/cg";

export default function OrderSummary() {
  const orderSummaryCollectionRef = collection(db, "orderSummary");
  const isEditOrder = useOrderStore((state) => state.isEditOrder);
  const toggleIsEditOrder = useOrderStore((state) => state.toggleIsEditOrder);
  const setCurrentOrderCopy = useOrderStore(
    (state) => state.setCurrentOrderCopy
  );
  const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder);
  const setCurrentOrder = useOrderStore((state) => state.setCurrentOrder);
  const orderSummary = useOrderStore((state) => state.orderSummary);
  const setOrderSummary = useOrderStore((state) => state.setOrderSummary);
  const setTargetedOrderID = useOrderStore((state) => state.setTargetedOrderID);
  const reloadDB = useOrderStore((state) => {
    state.reloadDB;
  });

  const [sortOrder, setSortOrder] = useState<OrderByDirection>("desc");

  const getOrderSummaryByCreatedTime = useCallback(
    async (sortOrder: OrderByDirection) => {
      try {
        const myQuery = query(
          orderSummaryCollectionRef,
          orderBy("created", sortOrder)
        );
        const data = await getDocs(myQuery);
        const orders = data.docs.map((doc) => ({
          id: doc.id,
          products: doc.data().products,
          created: doc.data().created,
        }));
        setOrderSummary(orders);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    getOrderSummaryByCreatedTime(sortOrder);
  }, []);

  function switchSortOrder() {
    if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }
  }

  console.log("trial");

  /*
                        async function getOrderSummaryByCreatedTime(sortOrder: OrderByDirection) {
                          try {
                            const myQuery = query(
                              orderSummaryCollectionRef,
                              orderBy("created", sortOrder)
                            );
                            const data = await getDocs(myQuery);
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
                         */

  // console.log("currentOrder", currentOrder);

  function handleAddToCurrentOrder(order: Order) {
    clearCurrentOrder();
    setCurrentOrder(order);
    setCurrentOrderCopy(order);
  }

  const orderSummaryList = orderSummary.map((item, index) => {
    return (
      <div
        key={index}
        className={`${styles.orderSummary} ${
          index % 2 === 0 ? styles.itemDivOdd : styles.itemDiv
        }`}
        onClick={() => {
          if (isEditOrder) {
            toggleIsEditOrder();
          }
          handleAddToCurrentOrder(item);
          setTargetedOrderID(item.id);
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
      <div className={styles.orderSummaryTitle}>
        <h4>Order Summary</h4>
        <div className={styles.orderSummaryIcon} onClick={switchSortOrder}>
          <CgArrowsExchangeV className={styles.switchIcon} />
          reverse order
        </div>
      </div>

      <div className={styles.orderSummaryContainer}>{orderSummaryList}</div>
    </>
  );
}
