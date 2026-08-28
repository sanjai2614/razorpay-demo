import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useCartStore from "../store/cartStore";

function Checkout() {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-gray-50 px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <h1 className="text-2xl font-bold">Your cart is empty</h1>

              <button
                onClick={() => navigate("/")}
                className="mt-5 rounded-xl bg-gray-900 px-5 py-3 font-medium text-white"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <section className="lg:col-span-2">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Checkout</h1>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900">{item.name}</h2>

                    <p className="mt-1 font-medium text-gray-600">
                      ₹{item.price}
                    </p>

                    {/* Quantity */}
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border"
                      >
                        −
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="mt-6 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-4 flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="my-5 border-t" />

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/payment")}
              className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              Proceed to Payment
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}

export default Checkout;
