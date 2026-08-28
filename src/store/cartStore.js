import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  completedOrder: null,

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  completeOrder: () =>
    set((state) => {
      const total = state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        completedOrder: {
          items: state.cart,
          total,
        },
        cart: [],
      };
    }),
}));

export default useCartStore;