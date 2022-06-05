import SimplePricing from "../pricings/SimplePricing";
const MainProduct = ({ product }) => {
  return (
    <>
      <a target="_blank" href={"/product/" + product.slug}>
        <div>
          <img
            className="object-cover rounded-t-lg w-full h-24 md:h-48"
            src={process.env.REACT_APP_BACKEND_URL + "/images/" + product.image}
            alt="Product Image"
          />
        </div>
        <div className="p-4 border border-gray-300 rounded-b-lg">
          <div>
            <h1 className="text-lg">{product.nama_produk}</h1>
            <div className="mt-2">
              <span className="text-red-500">
                <SimplePricing value={product.harga} />
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-400">
                {product.nama_kategori}
              </span>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};
export default MainProduct;
