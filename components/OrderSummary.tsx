import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { Order } from "@/stores/OrderStore";

export default function OrderSummary() {
  const [orderSummary, setOrderSummary] = useState<Order[]>([]);
  const orderSummaryCollectionRef = collection(db, "orderSummary");

  useEffect(() => {
    getOrderSummary();
  }, []);

  async function getOrderSummary() {
    const data = await getDocs(orderSummaryCollectionRef);
    setOrderSummary(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("orderSummary", orderSummary);
  }

  const orderSummaryList = orderSummary.map((item) => {
    return <p key={item.id}>{item.id}</p>;
  });

  return (
    <>
      <h4>Order Summary</h4>
      {orderSummaryList}
    </>
  );
}
