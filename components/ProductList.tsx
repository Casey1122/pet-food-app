import { productData } from "@/pages/api/productData";
import { Category } from "@/pages";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "../styles/Home.module.css";

/* ================== MAIN COMPONENT ================== */
export default function ProductList(props: Category) {
  const { category } = props;

  const filteredList = productData.filter((item) => item.category === category);

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
          <p>{item.name_en}</p>
        </div>
        <p>${item.price}</p>
        <button className={styles.buttonFlex}>
          <AiOutlinePlus className={styles.icon} /> Add to order
        </button>
      </div>
    );
  });

  return <div className={styles.productList}>{listElements}</div>;
}
