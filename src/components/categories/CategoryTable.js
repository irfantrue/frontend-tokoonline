const CategoryTable = ({ categories, callbackEditModal, callbackDelete, 
  sortingAtoZ, sortingZtoA, sortingIdTerendah, sortingIdTertinggi }) => {
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
                        ID Kategori
                      </div>
                      <div className={"flex gap-4 my-auto"}>
                        <p
                          onClick={() => {
                            sortingIdTertinggi();
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                          >
                          <i className="fas fa-chevron-up"></i>
                        </p>
                        <p
                          onClick={() => {
                            sortingIdTerendah();
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
                        Nama Kategori
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
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category, key) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.id}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {category.nama_kategori}
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
                            callbackEditModal(category.id);
                          }}
                          className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </p>
                        <p
                          onClick={() => {
                            callbackDelete(category.id);
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
export default CategoryTable;
