import { create } from "zustand";
import firestore from "firebase/firestore";
import { immer } from "zustand/middleware/immer";
import { set } from "@firebase/database";

export interface OrderStore {
  currentOrder: Product[];
  addToCurrentOrder: (item: Product) => void;
  clearCurrentOrder: () => void;
  totalAmount: number;
  setTotalAmount: (amount: number) => void;
  uniqueCurrentOrder: UniqueCurrentOrder[];
  setUniqueCurrentOrder: (
    currentOrder: Product[],
    uniqueCurrentOrder: UniqueCurrentOrder[]
  ) => void;
  incrementItem: (id: number, currentOrder: Product[]) => void;
  decrementItem: (id: number, currentOrder: Product[]) => void;
  removeItem: (id: number, currentOrder: Product[]) => void;
  // orderSummary: OrderSummary[];
}

export interface Product {
  id: number;
  category: string;
  type?: string;
  part?: string;
  name_en: string;
  name_tc: string;
  price: number;
  gram: number;
}

export interface UniqueCurrentOrder {
  product: Product;
  quantity: number;
}

export interface Order {
  products: Product[];
  created: firestore.Timestamp;
}

interface Count {
  [key: number]: number;
}

export const useOrderStore = create<OrderStore>((set) => ({
  currentOrder: [],
  addToCurrentOrder: (item: Product) =>
    set((state) => ({ ...state, currentOrder: [...state.currentOrder, item] })),
  clearCurrentOrder: () => set({ currentOrder: [] }),
  totalAmount: 0,
  setTotalAmount: (amount) => set({ totalAmount: amount }),
  uniqueCurrentOrder: [],
  setUniqueCurrentOrder: (currentOrder) =>
    set({
      uniqueCurrentOrder: createUniqueCurrentOrder(currentOrder),
    }),
  incrementItem: (id: number, currentOrder) =>
    set({
      currentOrder: [
        ...currentOrder,
        incrementCurrentOrder(id, currentOrder) as Product,
      ],
    }),
  decrementItem: (id: number, currentOrder) =>
    set({ currentOrder: decrementCurrentOrder(id, currentOrder) }),
  removeItem: (id: number, currentOrder) => {
    set({ currentOrder: removeItem(id, currentOrder) });
  },
}));

/*
export const useOrderStore = create<CurrentOrderStore>(
  immer<State & Actions>((set) => ({
    currentOrder: [],
    addToCurrentOrder: (item: Product) =>
      set((state) => {
        state.currentOder.push(item);
      }),
    clearCurrent: () => set(state => state.)
  }))
);

 */

function createUniqueCurrentOrder(
  currentOrder: Product[]
): UniqueCurrentOrder[] {
  const count: Count = {};
  currentOrder.forEach((item) => {
    count[item.id] = (count[item.id] || 0) + 1;
  });

  const uniqueCurrentOrderList: UniqueCurrentOrder[] = [
    ...new Set(currentOrder),
  ].map((product) => ({
    product,

    quantity: count[product.id],
  }));
  uniqueCurrentOrderList.sort((a, b) => a.product.id - b.product.id);
  return uniqueCurrentOrderList as UniqueCurrentOrder[];
}

function incrementCurrentOrder(id: number, currentOrder: Product[]) {
  return currentOrder.find((item) => item.id === id);
}

function decrementCurrentOrder(id: number, currentOrder: Product[]) {
  const indexOfTargetItem = currentOrder.findIndex((item) => item.id === id);
  const halfBeforeUnwantedItem = currentOrder.slice(0, indexOfTargetItem);
  const halfAfterUnwantedItem = currentOrder.slice(indexOfTargetItem + 1);
  return halfBeforeUnwantedItem.concat(halfAfterUnwantedItem);
}

function removeItem(id: number, currentOrder: Product[]) {
  return currentOrder.filter((item) => item.id !== id);
}
