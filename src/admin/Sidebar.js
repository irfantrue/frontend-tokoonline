import { Link, useHistory } from "react-router-dom";
import Skeleton from "../components/skeletons/Skeleton";
import SecondaryButton from "../components/buttons/SecondaryButton";
const Sidebar = ({ sidebarOpen, setSidebarOpen, route, data, loading }) => {
  const history = useHistory();
  const handleRoute = (e) => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-0 bg-green-600 bg-opacity-30 z-40 md:hidden md:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      <div
        className={`flex flex-col fixed z-40 left-0 top-0 md:left-auto md:top-auto md:translate-x-0 transform h-screen overflow-y-scroll md:overflow-y-auto no-scrollbar w-64 lg:w-72 flex-shrink-0 bg-green-600 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Close button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <div className="text-center mt-16">
          <div>
            {loading ? (
              <Skeleton className="w-full h-4 rounded" count="1" />
            ) : (
              <div>
                <h2 className="text-xl text-white font-semibold">{"Admin"}</h2>
                <p className="text-sm font-light" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <div className="last:mb-0">
              <Link to="produk">
                <SecondaryButton
                  onClick={(e) => {
                    handleRoute(e);
                  }}
                  className={`w-full py-4`}
                  label="Produk"
                />
              </Link>
            </div>{" "}
            <div className="last:mb-0">
              <Link to="kategori">
                <SecondaryButton
                  onClick={(e) => {
                    handleRoute(e);
                  }}
                  className={`w-full py-4`}
                  label="Kategori"
                />
              </Link>
            </div>
            <div className="mb-2 last:mb-0">
              <Link to="transaksi">
                <SecondaryButton
                  onClick={(e) => {
                    handleRoute(e);
                  }}
                  className={`w-full py-4`}
                  label="Transaksi"
                />
              </Link>
            </div>
            <div className="mb-2 last:mb-0">
              <Link to="pembayaran">
                <SecondaryButton
                  onClick={(e) => {
                    handleRoute(e);
                  }}
                  className={`w-full py-4`}
                  label="Pembayaran"
                />
              </Link>
            </div>
            <div className="mb-2 last:mb-0">
              <Link to="/">
                <SecondaryButton
                  onClick={(e) => {
                    handleRoute(e);
                  }}
                  className={`w-full py-4`}
                  label="Kembali"
                />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
