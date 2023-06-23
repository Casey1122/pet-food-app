import styles from "@/styles/Home.module.css";
import {
  UniqueCurrentOrder,
  useOrderStore,
  Order,
  Product,
} from "@/stores/OrderStore";
import { useEffect, useState } from "react";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TfiTrash } from "react-icons/tfi";
import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  Timestamp,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import ExtraProductModal from "@/components/ExtraProductModal";
import { current } from "immer";
import NoChangeModal from "@/components/NoChangeModal";

export default function ViewOrderDetails() {
  const isEditOrder = useOrderStore((state) => state.isEditOrder);
  const toggleIsEditOrder = useOrderStore((state) => state.toggleIsEditOrder);
  const toggleShowConfirmEditModal = useOrderStore(
    (state) => state.toggleShowConfirmEditModal
  );
  const currentOrder = useOrderStore((state) => state.currentOrder);
  const setCurrentOrder = useOrderStore((state) => state.setOrderSummary);
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
  const targetedOrderID = useOrderStore((state) => state.targetedOrderID);
  const [updateButtonText, setUpdateButtonText] =
    useState("Confirm Edit Order");
  const [isLoading, setIsLoading] = useState(false);
  const reloadDB = useOrderStore((state) => state.reloadDB);
  const setReloadDB = useOrderStore((state) => state.setReloadDB);
  const showExtraProductModal = useOrderStore(
    (state) => state.showExtraProductModal
  );
  const toggleShowExtraProductModal = useOrderStore(
    (state) => state.toggleShowExtraProductModal
  );
  const showNoChangeModal = useOrderStore((state) => state.showNoChangeModal);
  const toggleShowNoChangeModal = useOrderStore(
    (state) => state.toggleShowNoChangeModal
  );

  const [displayUniqueOrder, setDisplayUniqueOrder] = useState<
    UniqueCurrentOrder[]
  >([]);

  useEffect(() => {
    setTotalAmount(calculateTotal(currentOrder));
    setUniqueCurrentOrder(currentOrder, uniqueCurrentOrder);
    convertDisplayUniqueOrder(uniqueCurrentOrder);
  }, [currentOrder, displayUniqueOrder]);

  // console.log("currentOrder", currentOrder);

  // convertDisplayUniqueOrder() reduces parameter array
  // to show only unique order obj for order display.
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

  function handleCancelEdit() {
    const tempArr = [...currentOrder];
    toggleIsEditOrder();
    // setCurrentOrder(tempArr)
  }

  async function handleUpdateOrderToDB() {
    // console.log("currentOrder", currentOrder);
    setUpdateButtonText("Updating, please wait");
    setIsLoading(true);

    // the following logic checks whether the currentOrder is edited
    // if no edit made, i.e. currentOrder is identical to the Products[] from DB
    // no update to DB will be made.

    const orderRef = doc(db, "orderSummary", targetedOrderID);
    const orderRefSnap = await getDoc(orderRef);
    const orderRefSnapProductArray: Product[] = orderRefSnap.data().products;
    if (orderRefSnap.exists()) {
      console.log("orderRefSnapProductArray", orderRefSnapProductArray);
    } else {
      console.log("No such document.");
    }

    // CASE 1 - currentOrder.length > or < products array from DB
    if (
      currentOrder.length !== orderRefSnapProductArray.length &&
      currentOrder.length > 0
    ) {
      console.log("Case 1");
      try {
        await updateDoc(doc(db, "orderSummary", targetedOrderID), {
          products: currentOrder,
        });
        setUpdateButtonText("Update Finished");
        setTimeout(() => {
          toggleIsEditOrder();
          setIsLoading(false);
          setReloadDB();
        }, 1000);
        setUpdateButtonText("Confirm Edit Order");
      } catch (error) {
        console.error(error);
      }
      return;
    }

    // CASE 2 - currentOrder.length === products array.length which leads to product item checking
    // to see if everything is identical
    if (currentOrder.length === orderRefSnapProductArray.length) {
      console.log("Case 2");
      const checkArray = [];

      for (let i = 0; i < orderRefSnapProductArray.length; i++) {
        if (orderRefSnapProductArray[i].id === currentOrder[i].id) {
          checkArray.push("same");
        } else {
          checkArray.push("new");
        }
        console.log("checkArray", checkArray);
      }

      let findNewItem = checkArray.includes("new");
      console.log("findNewItem", findNewItem);

      if (!findNewItem) {
        toggleShowNoChangeModal();
        setIsLoading(false);
        return;
      }

      if (findNewItem) {
        try {
          setIsLoading(true);
          await updateDoc(doc(db, "orderSummary", targetedOrderID), {
            products: currentOrder,
          });
          setUpdateButtonText("Update Finished");
          setTimeout(() => {
            toggleIsEditOrder();
          }, 1000);
          setUpdateButtonText("Confirm Edit Order");
        } catch (error) {
          console.error(error);
        }
      }
    }

    // CASE 3 - currentOrder.length === 0 which will delete the record from DB
    if (currentOrder.length === 0) {
      console.log("Case 3");
      try {
        await deleteDoc(doc(db, "orderSummary", targetedOrderID));
        setUpdateButtonText("Update Finished");
        setTimeout(() => {
          toggleIsEditOrder();
          setIsLoading(false);
          setReloadDB();
        }, 1000);
        setUpdateButtonText("Confirm Edit Order");
      } catch (error) {
        console.error(error);
      }
      return;
    }
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
          {isEditOrder && (
            <AiOutlineMinus
              className={styles.quantityButton}
              onClick={() => decrementItem(item.product.id, currentOrder)}
            />
          )}
          <p>
            {item.quantity}
            {item.quantity > 1 ? " pcs" : " pc"}
          </p>
          {isEditOrder && (
            <AiOutlinePlus
              className={styles.quantityButton}
              onClick={() => incrementItem(item.product.id, currentOrder)}
            />
          )}
          {isEditOrder && (
            <TfiTrash
              className={styles.removeButton}
              onClick={() => removeItem(item.product.id, currentOrder)}
            />
          )}
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
        <p>ID: {targetedOrderID}</p>
        <p style={{ marginRight: "38px" }}>
          TOTAL ITEM: {currentOrder.length}
          {currentOrder.length > 1 ? "pcs" : "pc"}
        </p>
        <p>TOTAL: $ {totalAmount.toLocaleString("en-US")}</p>
      </div>
      <hr />
      {showNoChangeModal && <NoChangeModal />}
      {showExtraProductModal && <ExtraProductModal />}
      <div className={styles.buttonGroup}>
        {isEditOrder ? (
          <div>
            <button
              onClick={() => {
                toggleIsEditOrder();
              }}
              disabled={isLoading}
            >
              Cancel Edit
            </button>
            <button onClick={toggleShowExtraProductModal}>Extra Product</button>
            <button
              onClick={() => {
                handleUpdateOrderToDB();
                if (showExtraProductModal) {
                  toggleShowExtraProductModal();
                }
              }}
              disabled={isLoading}
            >
              {updateButtonText} {/* "Confirm Edit Order" */}
            </button>
          </div>
        ) : (
          <button
            className={styles.editButton}
            onClick={() => {
              toggleShowConfirmEditModal();
              setUpdateButtonText("Confirm update");
            }}
          >
            Edit Order
          </button>
        )}
      </div>
    </div>
  );
}
