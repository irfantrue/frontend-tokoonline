import MainSelectInput from "../forms/MainSelectInput";
import InfoModal from "../modals/InfoModal";
import SimplePricing from "../pricings/SimplePricing";

const TransactionTable = ({ editStatusTransaksiCallback, transactions, detailTransaksi,
  sortProdukAToZ, sortProdukZToA, sortPelangganAToZ, sortPelangganZToA,
  sortTanggalTerbaru, sortTanggalTerlama, sortTotalHargaTertinggi, sortTotalHargaTerendah,
  sortStatusAToZ, sortStatusZToA
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
                        Produk
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortProdukAToZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortProdukZToA();
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
                        Pelanggan
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortPelangganAToZ();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortPelangganZToA();
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
                        Tanggal
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortTanggalTerbaru();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortTanggalTerlama();
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
                {transactions.map((transaksi, key) => (
                  <tr key={key}>
                    <td 
                      className="px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => {
                        detailTransaksi(transaksi.id)
                      }}
                    >
                      <div className="text-sm text-gray-900">
                        {transaksi.nama_produk}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {" "}
                        {transaksi.fullname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaksi.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <SimplePricing value={transaksi.total_harga} />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex bg-yellow-100 text-yellow-800 text-xs leading-5 font-semibold rounded-full`}
                      >
                        {transaksi.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={"flex gap-4 my-auto"}>
                        <MainSelectInput
                          className={"w-fit"}
                          value={transaksi.status}
                          onChange={(e) => {
                            editStatusTransaksiCallback(
                              transaksi.id,
                              e.target.value
                            );
                          }}
                        >
                          <option>Edit</option>
                          <option value={"Menunggu Konfirmasi"}>Menunggu Konfirmasi</option>
                          <option value={"Diproses"}>Diproses</option>
                          <option value={"Dikirim"}>Dikirim</option>
                          <option value={"Selesai"}>Selesai</option>
                        </MainSelectInput>
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
export default TransactionTable;
