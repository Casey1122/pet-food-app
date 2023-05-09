import NewOrderDetails from "@/components/NewOrderDetails";
import ViewOrderDetails from "@/components/ViewOrderDetails";

interface Props {
  appInterface: string;
}

export default function OrderSection(props: Props) {
  return (
    <>
      {props.appInterface === "New Order" ? (
        <NewOrderDetails />
      ) : (
        <ViewOrderDetails />
      )}
    </>
  );
}
