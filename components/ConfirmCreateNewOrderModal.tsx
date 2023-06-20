import styles from "@/styles/Home.module.css";
import { useOrderStore } from "@/stores/OrderStore";

export default function ConfirmCreateNewOrderModal() {
  const toggleIsEditOrder = useOrderStore((state) => state.toggleIsEditOrder);
  const toggleShowConfirmEditModal = useOrderStore(
    (state) => state.toggleShowConfirmEditModal
  );

  // return <p>Confirm create new order modal</p>;
  return (
    <>
      <div className={styles.modal}>
        <p>Create this order?</p>
        <div className={styles.buttonGroup}>
          <button onClick={toggleShowConfirmEditModal}>Cancel</button>
          <button
            onClick={() => {
              toggleIsEditOrder();
              toggleShowConfirmEditModal();
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
