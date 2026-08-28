import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useCartStore from "../store/cartStore";

function Success() {
  const navigate = useNavigate();

  const completedOrder = useCartStore(
    (state) => state.completedOrder
  );

  if (!completedOrder) {
    navigate("/");
    return null;
  }

  const totalItems = completedOrder.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Header />

      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>

          <p className="mt-3 text-gray-600">
            Your order has been placed successfully.
          </p>

          <div className="mt-6 rounded-xl bg-gray-50 p-5 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Items</span>
              <span className="font-medium">
                {totalItems}
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-bold text-gray-900">
                ₹{completedOrder.total}
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-gray-600">
                Payment Status
              </span>

              <span className="font-medium text-green-600">
                Success
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </>
  );
}

export default Success;