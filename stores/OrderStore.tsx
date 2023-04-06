import { create } from "zustand";
import { Product } from "@/pages/api/productData";

export interface CurrentOrderStore {
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
}

export interface UniqueCurrentOrder {
  product: Product;
  quantity: number;
}

export const useCurrentOrderStore = create<CurrentOrderStore>((set) => ({
  currentOrder: [],
  addToCurrentOrder: (item: Product) =>
    set((state) => ({ ...state, currentOrder: [...state.currentOrder, item] })),
  clearCurrentOrder: () => set({ currentOrder: [] }),
  totalAmount: 0,
  setTotalAmount: (amount) => set({ totalAmount: amount }),
  uniqueCurrentOrder: [],
  setUniqueCurrentOrder: (currentOrder, uniqueCurrentOrder) =>
    set({
      uniqueCurrentOrder: createUniqueCurrentOrder(
        currentOrder,
        uniqueCurrentOrder
      ),
    }),
}));

function createUniqueCurrentOrder(
  currentOrder: Product[],
  uniqueCurrentOrder: UniqueCurrentOrder[]
) {
  const count = {};
  currentOrder.forEach((item) => {
    // @ts-ignore
    count[item.id] = (count[item.id] || 0) + 1;
  });
  // @ts-ignore
  const uniqueItemList: UniqueCurrentOrder = [...new Set(currentOrder)].map(
    (product) => ({
      product,
      quantity: count[product.id],
    })
  );
  return uniqueItemList;
}
