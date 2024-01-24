import { OrderItem } from '@/types';
import { create } from 'zustand';

export interface OrderSummaryState {
  orderItems: OrderItem[];
  total: number;
  base: number;
  taxes: number;
  setItems: (items: OrderItem[]) => void;
  // Other properties and functions in your state
}

const useOrderSummaryStore = create<OrderSummaryState>((set) => ({
  total: 1000,
  base: 200,
  taxes: 20, // TODO Is this a percentange?
  orderItems: [
    {
      label: 'Rose Gold',
      categroy: 'Foil',
      quantity: 40,
      value: 10,
    },
    {
      label: 'Rose Gold',
      categroy: 'Envelop Liner',
      quantity: 40,
      value: 10,
    },
  ],
  setItems: (items: OrderItem[]) => set({ orderItems: [...items] }),
}));

export default useOrderSummaryStore;
