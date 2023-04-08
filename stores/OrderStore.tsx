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
  incrementItem: (id: number, currentOrder: Product[]) => void;
  decrementItem: (id: number, currentOrder: Product[]) => void;
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
  incrementItem: (id: number, currentOrder: Product[]) =>
    set({
      currentOrder: [...currentOrder, incrementCurrentOrder(id, currentOrder)],
    }),
  decrementItem: (id: number, currentOrder: Product[]) =>
    set({ currentOrder: decrementCurrentOrder(id, currentOrder) }),
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
  const uniqueItemList: UniqueCurrentOrder[] = [...new Set(currentOrder)].map(
    (product) => ({
      product,
      // @ts-ignore
      quantity: count[product.id],
    })
  );
  uniqueItemList.sort((a, b) => a.product.id - b.product.id);
  return uniqueItemList as unknown as Product[];
}

function incrementCurrentOrder(id: number, currentOrder: Product[]) {
  return currentOrder.filter((item) => item.id === id)[0];
}

function decrementCurrentOrder(id: number, currentOrder: Product[]) {
  const indexOfTargetItem = currentOrder.findIndex((item) => item.id === id);
  const halfBeforeUnwantedItem = currentOrder.slice(0, indexOfTargetItem);
  const halfAfterUnwantedItem = currentOrder.slice(indexOfTargetItem + 1);
  return halfBeforeUnwantedItem.concat(halfAfterUnwantedItem);
}
