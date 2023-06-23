import styles from "@/styles/Home.module.css";
import { useOrderStore } from "@/stores/OrderStore";

export default function ConfirmEditModal() {
  const toggleIsEditOrder = useOrderStore((state) => state.toggleIsEditOrder);
  const toggleShowConfirmEditModal = useOrderStore(
    (state) => state.toggleShowConfirmEditModal
  );
  const currentOrder = useOrderStore((state) => state.currentOrder);

  return (
    <>
      <div className={styles.modal}>
        {currentOrder.length > 0 ? (
          <>
            <p>Start editing this order?</p>
            <p>
              By pressing confirm, <br />
              You can edit the quantity of items under this order.
            </p>
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
          </>
        ) : (
          <>
            <p>Select an order to edit</p>
            <div className={styles.buttonGroup}>
              <button
                onClick={toggleShowConfirmEditModal}
                style={{ margin: 0 }}
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.modalOverlay}></div>
    </>
  );
}
