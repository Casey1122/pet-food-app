import styles from "@/styles/Home.module.css";
import { useCurrentOrderStore } from "@/stores/OrderStore";
import { useEffect, useState } from "react";

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

  const currentOrderElement = uniqueCurrentOrder.map((item, index) => {
    return (
      <div key={index} className={styles.orderItem}>
        <div className={styles.itemTitle}>
          <p>{item.product.name_tc}</p>
          <p>{item.product.name_en}</p>
        </div>
        <p>{item.quantity}</p>
        <p>${item.product.price}</p>
      </div>
    );
  });

  useEffect(() => {
    calculateTotal();
    setUniqueCurrentOrder(currentOrder, uniqueCurrentOrder);
  }, [currentOrder]);

  // console.log("currentOrder", currentOrder);
  console.log("uniqueCurrentOrder", uniqueCurrentOrder);

  function calculateTotal() {
    const result = currentOrder
      .map((item) => item.price)
      .reduce((accumulator, current) => accumulator + current, 0);
    setTotalAmount(result);
  }

  // function itemCount(id: number) {
  //   // @ts-ignore
  //   const uniqueItems = [...new Set(currentOrder)];
  //   const count = uniqueItems.map((item) => [
  //     item,
  //     currentOrder.filter((element) => element.id === id).length,
  //   ]);
  //   console.log("count", count);
  //   return count;
  // }

  // function itemCount2() {
  //   // @ts-ignore
  //   const uniqueItemList = [...new Set(currentOrder)];
  //   const uniqueItemListWithQuantity = uniqueItemList.map((item) => ({
  //     item,
  //     quantity: 1,
  //   }));
  //   setUniqueItem(uniqueItemListWithQuantity);
  // }

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
        <p>TOTAL:</p>
        <p>${totalAmount}</p>
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
