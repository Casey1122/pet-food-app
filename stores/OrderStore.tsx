import { create } from "zustand";
import firestore from "firebase/firestore";
import {
  collection,
  getDocs,
  orderBy,
  OrderByDirection,
  query,
} from "@firebase/firestore";
import { db } from "@/firebaseConfig";

// import { Timestamp } from "@firebase/firestore";

export interface OrderStore {
  currentOrder: Product[];
  addToCurrentOrder: (item: Product) => void;
  setCurrentOrder: (item: Order) => void;
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
  calculateTotal: (currentOrder: Product[]) => number;
  showConfirmEditModal: boolean;
  toggleShowConfirmEditModal: () => void;
  isEditOrder: boolean;
  toggleIsEditOrder: () => void;
  showConfirmCreateNewOrderModal: boolean;
  toggleShowConfirmCreateNewOrderModal: () => void;
  orderSummary: Order[];
  setOrderSummary: (order: Order[]) => void;
  targetedOrderID: string;
  setTargetedOrderID: (id: string) => void;
  reloadDB: boolean;
  setReloadDB: () => void;
  showExtraProductModal: boolean;
  toggleShowExtraProductModal: () => void;
  showNoChangeModal: boolean;
  toggleShowNoChangeModal: () => void;
  currentOrderCopy: Product[];
  setCurrentOrderCopy: (item: Order) => void;
  displayUniqueOrder: UniqueCurrentOrder[];
  setDisplayUniqueOrder: (uniques: UniqueCurrentOrder[]) => void;
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
  id: string;
}

interface Count {
  [key: number]: number;
}

export const useOrderStore = create<OrderStore>((set) => ({
  currentOrder: [],
  addToCurrentOrder: (item: Product) =>
    set((state) => ({ ...state, currentOrder: [...state.currentOrder, item] })),
  setCurrentOrder: (item: Order) =>
    set((state) => ({
      ...state,
      currentOrder: item.products,
      id: item.id,
      created: item.created,
    })),
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
  calculateTotal: calculateTotal,
  showConfirmEditModal: false,
  toggleShowConfirmEditModal: () =>
    set((state) => ({ showConfirmEditModal: !state.showConfirmEditModal })),
  isEditOrder: false,
  toggleIsEditOrder: () =>
    set((state) => ({ isEditOrder: !state.isEditOrder })),
  showConfirmCreateNewOrderModal: false,
  toggleShowConfirmCreateNewOrderModal: () =>
    set((state) => ({
      showConfirmCreateNewOrderModal: !state.showConfirmCreateNewOrderModal,
    })),
  orderSummary: [],
  setOrderSummary: (order) => set((state) => ({ orderSummary: order })),
  targetedOrderID: "",
  setTargetedOrderID: (id) => {
    set((state) => ({ targetedOrderID: id }));
  },
  reloadDB: false,
  setReloadDB: () => {
    set((state) => ({ reloadDB: !state.reloadDB }));
  },
  showExtraProductModal: false,
  toggleShowExtraProductModal: () => {
    set((state) => ({ showExtraProductModal: !state.showExtraProductModal }));
  },
  showNoChangeModal: false,
  toggleShowNoChangeModal: () => {
    set((state) => ({ showNoChangeModal: !state.showNoChangeModal }));
  },
  currentOrderCopy: [],
  setCurrentOrderCopy: (item: Order) =>
    set((state) => ({
      ...state,
      currentOrder: item.products,
      id: item.id,
      created: item.created,
    })),
  displayUniqueOrder: [],
  setDisplayUniqueOrder: (uniques) => {
    set((state) => ({ displayUniqueOrder: uniques }));
  },
}));

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

function calculateTotal(currentOrder: Product[]) {
  return currentOrder
    .map((item) => item.price)
    .reduce((accumulator, current) => accumulator + current, 0);
}
