import SimplePricing from "../pricings/SimplePricing";

const TableProduct = ({ products, callbackEditProduct, deleteProduct,
  sortingKodeAtoZ, sortingKodeZtoA,
  sortingAtoZ, sortingZtoA, sortingLowestPrice, sortingHighestPrice,
  sortingKategoriAtoZ, sortingKategoriZtoA }) => {  
  return (
    <div className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className={"flex justify-between"}>
                      <div>
                        Kode Produk
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortingKodeAtoZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortingKodeZtoA();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-down"></i>
                        </p>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className={"flex justify-between"}>
                      <div>
                        Produk
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortingAtoZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortingZtoA();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-down"></i>
                        </p>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className={"flex justify-between"}>
                      <div>
                        Harga
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortingHighestPrice();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortingLowestPrice();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-down"></i>
                        </p>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className={"flex justify-between"}>
                      <div>
                        Kategori
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortingKategoriAtoZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortingKategoriZtoA();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-down"></i>
                        </p>
                      </div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, key) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.kode_prd}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10"
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              "/images/" +
                              product.image
                            }
                            alt={product.nama_produk}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.nama_produk}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.desc}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <SimplePricing value={product.harga} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.kategori}
                      </div>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => {
                        //
                      }}
                    >
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            callbackEditProduct(product.slug);
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </p>
                        <p
                          onClick={() => {
                            deleteProduct(product.slug);
                          }}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableProduct;
