import NewOrderDetails from "@/components/NewOrderDetails";
import ViewOrderDetails from "@/components/ViewOrderDetails";
import ConfirmEditModal from "@/components/ConfirmEditModal";
import { useOrderStore } from "@/stores/OrderStore";

interface Props {
  appInterface: string;
}

export default function OrderSection(props: Props) {
  const showConfirmEditModal = useOrderStore(
    (state) => state.showConfirmEditModal
  );

  return (
    <>
      {props.appInterface === "New Order" ? (
        <NewOrderDetails />
      ) : (
        <>
          {showConfirmEditModal && <ConfirmEditModal />}
          <ViewOrderDetails />
        </>
      )}
    </>
  );
}
