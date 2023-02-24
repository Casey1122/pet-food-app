import { productData } from "@/pages/api/productData";
import { HandleCateChange } from "@/pages";

import styles from "../styles/Home.module.css";

export default function Button(props: HandleCateChange) {
  const category: string[] = [
    // @ts-ignore
    ...new Set(productData.map((item) => item.category)),
  ];

  const listElements = category.map((item, index) => (
    <button key={index} onClick={() => props.handleCateChange(item)}>
      {item}
    </button>
  ));

  console.log("props", props);

  return (
    <>
      {listElements}
      <button onClick={() => props.handleCateChange("")}>Clear</button>
    </>
  );
}
