function ProductCard({ product, onAddToCart }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      
      <div className="h-52 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 text-2xl font-bold text-gray-900">
          ₹{product.price}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-5 w-full rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;