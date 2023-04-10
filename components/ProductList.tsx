import { productData } from "@/pages/api/productData";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "../styles/Home.module.css";
import { useCurrentOrderStore } from "@/stores/OrderStore";

interface Props {
  category: string;
}

/* ================== MAIN COMPONENT ================== */
export default function ProductList(props: Props) {
  const addToCurrentOrder = useCurrentOrderStore(
    (state) => state.addToCurrentOrder
  );

  const filteredList = productData.filter(
    (item) => item.category === props.category
  );

  const listElements = filteredList.map((item, index) => {
    return (
      <div
        key={index}
        className={`${styles.item} ${
          index % 2 === 0 ? styles.itemDivOdd : styles.itemDiv
        }`}
      >
        <div className={styles.itemName}>
          <p>{item.name_tc}</p>
          <p>
            ( ID: {item.id} ) - {item.name_en}
          </p>
        </div>
        <p>${item.price}</p>
        <button
          className={styles.buttonFlex}
          onClick={() => addToCurrentOrder(item)}
        >
          <AiOutlinePlus className={styles.icon} />
          Add to order
        </button>
      </div>
    );
  });

  return <div className={styles.productList}>{listElements}</div>;
}
