import styles from "@/styles/Home.module.css";
import InterfaceFilterButton from "@/components/InterfaceFilterButton";
import { useState } from "react";
import NewOrderInterface from "@/components/NewOrderInterface";

interface Props {
  handleInterfaceChange: (value: string) => void;
  appInterface: string;
}

function List(props: Props) {
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
        "View Order Interface"
      )}
    </div>
  );
}

export default List;
