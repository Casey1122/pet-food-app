import { productData } from "@/pages/api/productData";
import { HandleCateChange } from "@/pages";

import styles from "../styles/Home.module.css";

/* ================== MAIN COMPONENT ================== */
export default function CateFilterButton(props: HandleCateChange) {
  const category: string[] = [
    // @ts-ignore
    ...new Set(productData.map((item) => item.category)),
  ];

  const filterButtonList = category.map((item, index) => (
    <div key={index}>
      <input type="radio" id={item} name="filter" value={item} />
      <label htmlFor={item} onClick={() => props.handleCateChange(item)}>
        {item}
      </label>
    </div>
  ));

  return <div className={styles.filterButtonList}>{filterButtonList}</div>;
}
