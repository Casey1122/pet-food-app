import { productData } from "@/pages/api/productData";
import { HandleCateChange } from "@/pages";

import styles from "../styles/Home.module.css";
import { useState } from "react";

/* ================== MAIN COMPONENT ================== */
export default function Button(props: HandleCateChange) {
  const [checkedIcon, setCheckedIcon] = useState("");

  const category: string[] = [
    // @ts-ignore
    ...new Set(productData.map((item) => item.category)),
  ];

  console.log(props);

  const listElements = category.map((item, index) => (
    <div key={index}>
      <input type="radio" id={item} name="filter" value={item} />
      <label htmlFor={item} onClick={() => props.handleCateChange(item)}>
        {item}
      </label>
    </div>
  ));

  return (
    <>
      <ul className={styles.productList}>{listElements}</ul>
    </>
  );
}
