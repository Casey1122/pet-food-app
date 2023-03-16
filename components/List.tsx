import styles from "@/styles/Home.module.css";
import InterfaceFilterButton from "@/components/InterfaceFilterButton";
import CateFilterButton from "@/components/CateFilterButton";
import ProductList from "@/components/ProductList";

interface ListProps {
  handleInterfaceChange: (value: string) => void;
  handleCateChange: (value: string) => void;
  category: string;
}

function List(props: ListProps) {
  console.log(props);
  return (
    <div className={styles.listContainer}>
      <InterfaceFilterButton
        handleInterfaceChange={props.handleInterfaceChange}
      />
      <h4>Category</h4>
      <CateFilterButton handleCateChange={props.handleCateChange} />
      <h4>Products</h4>
      <ProductList category={props.category} />
    </div>
  );
}

export default List;
