import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import useCartStore from "../store/cartStore";

function Products() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Shop
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Our Products
            </h1>

            <p className="mt-3 text-gray-600">
              Choose your favorite product and continue to checkout.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

export default Products;