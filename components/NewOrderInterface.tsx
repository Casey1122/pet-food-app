import CateFilterButton from "@/components/CateFilterButton";
import ProductList from "@/components/ProductList";

interface Props {
  handleCateChange: (category: string) => void;
  category: string;
}

export default function NewOrderInterface(props: Props) {
  return (
    <>
      <h4>Category</h4>
      <CateFilterButton handleCateChange={props.handleCateChange} />
      <h4>Products</h4>
      <ProductList category={props.category} />
    </>
  );
}
