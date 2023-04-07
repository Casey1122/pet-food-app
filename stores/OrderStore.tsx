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
  incrementOrder: () => Product[];
  decrementOrder: () => Product[];
}

export interface UniqueCurrentOrder {
  product: Product;
  quantity: number;
}

interface Count {
  id?: number;
  quantity?: number;
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
      // @ts-ignore
      uniqueCurrentOrder: createUniqueCurrentOrder(
        currentOrder,
        uniqueCurrentOrder
      ),
    }),
  incrementOrder: () => set({ currentOrder: incrementCurrentOrder() }),
  decrementOrder: () => set({ currentOrder: decrementCurrentOrder() }),
}));

function createUniqueCurrentOrder(
  currentOrder: Product[],
  uniqueCurrentOrder: UniqueCurrentOrder[]
): Product[] {
  const count: Count = {};
  currentOrder.forEach((item) => {
    // @ts-ignore
    count[item.id] = (count[item.id] || 0) + 1;
  });
  // @ts-ignore
  const uniqueItemList: UniqueCurrentOrder = [...new Set(currentOrder)].map(
    (product) => ({
      product,
      // @ts-ignore
      quantity: count[product.id],
    })
  );
  return uniqueItemList as unknown as Product[];
}

function incrementCurrentOrder() {
  const result = [];
}

function decrementCurrentOrder() {}
