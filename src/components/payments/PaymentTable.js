import SimplePricing from "../pricings/SimplePricing";
import MainSelectInput from "../forms/MainSelectInput";

const PaymentTable = ({
  pembayarans,
  editStatusPembayaranCallback,
  deletePembayaranById,
  detailPayment,
  sortKodeAToZ,
  sortKodeZToA,
  sortDetailAToZ,
  sortDetailZToA,
  sortTeleponTertinggi,
  sortTeleponTerendah,
  sortNamaAToZ,
  sortNamaZToA,
  sortTotalHargaTertinggi,
  sortTotalHargaTerendah,
  sortStatusAToZ,
  sortStatusZToA
}) => {
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
                        Kode Pembayaran
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortKodeAToZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortKodeZToA();
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
                        Detail
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortDetailAToZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortDetailZToA();
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
                        Telepon
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortTeleponTertinggi();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortTeleponTerendah();
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
                        Nama
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortNamaAToZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortNamaZToA();
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
                        Total Harga
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortTotalHargaTertinggi();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortTotalHargaTerendah();
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
                        Status
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortStatusAToZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortStatusZToA();
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
                {pembayarans.map((product, key) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.kode_pby}
                      </div>
                    </td>

                    <td
                      className="px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => {
                        detailPayment(product.id);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10"
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              "/images/" +
                              product.image
                            }
                            // alt={"Image"}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-900">
                            {product.desc}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.phone}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.fullname}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <SimplePricing value={product.total_harga} />
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.status}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={"flex gap-4 my-auto"}>
                        <MainSelectInput
                          className={"w-fit"}
                          value={product.status}
                          onChange={(e) => {
                            editStatusPembayaranCallback(
                              product.id,
                              e.target.value
                            );
                          }}
                        >
                          <option value={"Belum Lunas"}>Belum Lunas</option>
                          <option value={"Lunas"}>Lunas</option>
                        </MainSelectInput>
                        <p
                          onClick={() => {
                            deletePembayaranById(product.id);
                          }}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash mt-5"></i>
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
export default PaymentTable;
