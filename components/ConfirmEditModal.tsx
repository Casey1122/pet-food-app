import styles from "@/styles/Home.module.css";
import { useOrderStore } from "@/stores/OrderStore";

export default function ConfirmEditModal() {
  const toggleIsEditOrder = useOrderStore((state) => state.toggleIsEditOrder);
  const toggleShowConfirmEditModal = useOrderStore(
    (state) => state.toggleShowConfirmEditModal
  );

  return (
    <>
      <div className={styles.modal}>
        <p>Start editing this order?</p>
        <p>You can edit the quantity of items under this order.</p>
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
