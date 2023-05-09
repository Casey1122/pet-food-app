import styles from "@/styles/Home.module.css";
import InterfaceFilterButton from "@/components/InterfaceFilterButton";
import { useState } from "react";
import NewOrderInterface from "@/components/NewOrderInterface";
import OrderSummary from "@/components/OrderSummary";
import { useOrderStore } from "@/stores/OrderStore";

interface Props {
  handleInterfaceChange: (value: string) => void;
  appInterface: string;
}

function ListSection(props: Props) {
  const currentOrder = useOrderStore((state) => state.currentOrder);
  const [category, setCategory] = useState("");

  function handleCateChange(category: string) {
    setCategory(category);
  }

  return (
    <div className={styles.listContainer}>
      <InterfaceFilterButton
        handleInterfaceChange={props.handleInterfaceChange}
      />
      {props.appInterface === "New Order" ? (
        <NewOrderInterface
          handleCateChange={handleCateChange}
          category={category}
        />
      ) : (
        <OrderSummary />
      )}
    </div>
  );
}

export default ListSection;
