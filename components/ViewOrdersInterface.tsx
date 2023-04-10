import styles from "@/styles/Home.module.css";
import InterfaceFilterButton from "@/components/InterfaceFilterButton";

interface Props {
  handleInterfaceChange: (interfaceValue: string) => void;
}

export default function ViewOrdersInterface(props: Props) {
  return (
    <div className={styles.listContainer}>
      <InterfaceFilterButton
        handleInterfaceChange={props.handleInterfaceChange}
      />
    </div>
  );
}
