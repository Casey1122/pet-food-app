import { create } from "zustand";
import { Product } from "@/pages/api/productData";

export interface CurrentOrderStore {
  currentOrder: Product[];
  addToCurrentOrder: (item: Product) => void;
  clearCurrentOrder: () => void;
}

export const useCurrentOrderStore = create<CurrentOrderStore>((set) => ({
  currentOrder: [],
  addToCurrentOrder: (item: Product) =>
    set((state) => ({ ...state, currentOrder: [...state.currentOrder, item] })),
  clearCurrentOrder: () => set({ currentOrder: [] }),
}));
