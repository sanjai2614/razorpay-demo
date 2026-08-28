import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useCartStore from "../store/cartStore";

function Payment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const cart = useCartStore((state) => state.cart);
  const completeOrder = useCartStore((state) => state.completeOrder);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handlePayment = async () => {
  // 1. Form validation
  const isEmpty = Object.values(formData).some(
    (value) => value.trim() === ""
  );

//   if (isEmpty) {
//     alert("Please fill all delivery details");
//     return;
//   }

  try {
    // 2. Ask backend to create Razorpay order
    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert("Failed to create order");
      return;
    }

    // 3. Open Razorpay Checkout with backend-created order
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Demo Store",
      description: "Order Payment",

      order_id: data.order.id,

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },

      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      },

      handler: async function (response) {
  try {
    const verifyResponse = await fetch(
      "http://localhost:5000/verify-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      alert("Payment verification failed");
      return;
    }

    // Backend verified successfully ✅
    completeOrder();
    navigate("/success");
  } catch (error) {
    console.error("Verification error:", error);
    alert("Payment verification failed");
  }
},

      theme: {
        color: "#111827",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong");
  }
};

  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold">No items to pay for</h1>

            <button
              onClick={() => navigate("/")}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-3 font-medium text-white"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Payment
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Delivery & Payment Details
            </h1>

            <p className="mt-2 text-gray-600">
              Enter your delivery details before proceeding to payment.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Customer Details */}
            <section className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900">
                Delivery Details
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                rows="4"
                className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />
              </div>
            </section>

            {/* Order Summary */}
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>

                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-gray-200" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePayment}
                className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-4 font-semibold text-white transition hover:bg-gray-700"
              >
                Pay ₹{total}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                🔒 Secure payment powered by Razorpay
              </p>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export default Payment;