import styles from "@/styles/Home.module.css";
import { Product, useOrderStore } from "@/stores/OrderStore";

interface Props {
  handleCreateOrder: (currentOrder: Product[]) => Promise<void>;
}

export default function ConfirmCreateNewOrderModal(props: Props) {
  const showConfirmCreateNewOrderModal = useOrderStore(
    (state) => state.showConfirmCreateNewOrderModal
  );
  const toggleShowConfirmCreateNewOrderModal = useOrderStore(
    (state) => state.toggleShowConfirmCreateNewOrderModal
  );
  const currentOrder = useOrderStore((state) => state.currentOrder);

  // return <p>Confirm create new order modal</p>;
  return (
    <>
      <div className={styles.modal}>
        <p>Create this order?</p>
        <p>After confirmation, this order will be stored in the database.</p>
        <div className={styles.buttonGroup}>
          <button onClick={toggleShowConfirmCreateNewOrderModal}>Cancel</button>
          <button
            onClick={() => {
              toggleShowConfirmCreateNewOrderModal();
              props.handleCreateOrder(currentOrder);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      <div className={styles.modalOverlay}></div>
    </>
  );
}
