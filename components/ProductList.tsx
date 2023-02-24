import { productData } from "@/pages/api/productData";
import { Category } from "@/pages";

import styles from "../styles/Home.module.css";

/* ================== MAIN COMPONENT ================== */
export default function ProductList(props: Category) {
  const { category } = props;

  const filteredList = productData.filter((item) => item.category === category);

  const listElements = filteredList.map((item, index) => {
    return (
      <div
        key={index}
        className={index % 2 === 0 ? styles.itemDivOdd : styles.itemDiv}
      >
        <p>
          {item.name_tc}
          {item.name_en}
        </p>
        <p>${item.price}</p>
      </div>
    );
  });

  return <>{listElements}</>;
}
