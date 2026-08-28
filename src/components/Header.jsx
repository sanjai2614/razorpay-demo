import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Header() {
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          Razorpay Demo
        </Link>

        <Link
          to="/checkout"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Cart ({totalItems})
        </Link>
      </div>
    </header>
  );
}

export default Header;
