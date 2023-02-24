import { productData } from "@/pages/api/productData";
import { Category } from "@/pages";

export default function ProductList(props: Category) {
  const listEle = productData.map((item, index) => (
    <div key={index}>
      <p>{item.name_en}</p>
      <p>${item.price}</p>
    </div>
  ));

  return <>{listEle}</>;
}
