import { productData } from "@/pages/api/productData";
import { HandleCateChange } from "@/pages";

export default function Button(props: HandleCateChange) {
  const category: string[] = [
    // @ts-ignore
    ...new Set(productData.map((item) => item.category)),
  ];
  // console.log(category);

  const listElements = category.map((item, index) => (
    <button key={index}>{item}</button>
  ));

  return (
    <>
      {listElements}
      <button>Clear</button>
    </>
  );
}
