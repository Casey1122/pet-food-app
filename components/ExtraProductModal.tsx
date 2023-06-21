import { useOrderStore } from "@/stores/OrderStore";
import { productData } from "@/pages/api/productData";
import styles from "@/styles/Home.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function ExtraProductModal() {
  const addToCurrentOrder = useOrderStore((state) => state.addToCurrentOrder);
  const showExtraProductModal = useOrderStore(
    (state) => state.showExtraProductModal
  );
  const toggleShowExtraProductModal = useOrderStore(
    (state) => state.toggleShowExtraProductModal
  );

  const productList = productData.map((item, index) => {
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
            ( ID: {item.id}) - {item.name_en}
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

  return (
    <div className={styles.showExtraProductModal}>
      <div className={styles.extraProductTitle}>
        <h4>Extra Product List</h4>
        <IoCloseCircleSharp
          className={styles.closeButton}
          onClick={toggleShowExtraProductModal}
        />
      </div>
      <div className={styles.productList}>{productList}</div>
    </div>
  );
}
