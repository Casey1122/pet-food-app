import NewOrderDetails from "@/components/NewOrderDetails";
import ViewOrderDetails from "@/components/ViewOrderDetails";
import ConfirmEditModal from "@/components/ConfirmEditModal";
import { Product, useOrderStore } from "@/stores/OrderStore";
import ConfirmCreateNewOrderModal from "@/components/ConfirmCreateNewOrderModal";
import { addDoc, collection, Timestamp } from "@firebase/firestore";
import { useState } from "react";
import { db } from "@/firebaseConfig";

interface Props {
  appInterface: string;
}

export default function OrderSection(props: Props) {
  const showConfirmEditModal = useOrderStore(
    (state) => state.showConfirmEditModal
  );
  const showConfirmCreateNewOrderModal = useOrderStore(
    (state) => state.showConfirmCreateNewOrderModal
  );
  const clearCurrentOrder = useOrderStore((state) => state.clearCurrentOrder);

  const [buttonText, setButtonText] = useState("Create Order");
  const [isLoading, setIsLoading] = useState(false);

  const orderSummaryCollectionRef = collection(db, "orderSummary");

  async function handleCreateOrder(currentOrder: Product[]) {
    try {
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
    } catch (error) {
      console.log("Error when uploading to Firebase", error);
    }
  }

  return (
    <>
      {props.appInterface === "New Order" ? (
        <>
          {showConfirmCreateNewOrderModal && <ConfirmCreateNewOrderModal />}
          <NewOrderDetails
            buttonText={buttonText}
            setButtonText={setButtonText}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleCreateOrder={handleCreateOrder}
          />
        </>
      ) : (
        <>
          {showConfirmEditModal && <ConfirmEditModal />}
          <ViewOrderDetails />
        </>
      )}
    </>
  );
}
