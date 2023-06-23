import styles from "@/styles/Home.module.css";
import { useOrderStore } from "@/stores/OrderStore";

export default function NoChangeModal() {
  const toggleIsEditOrder = useOrderStore((state) => state.toggleIsEditOrder);
  const toggleShowNoChangeModal = useOrderStore(
    (state) => state.toggleShowNoChangeModal
  );

  return (
    <div className={styles.modal}>
      <p>No changes Made</p>
      <div className={styles.buttonGroup}>
        <button
          className={styles.buttonGroup}
          onClick={() => {
            toggleIsEditOrder();
            toggleShowNoChangeModal();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
