import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Product from "./Product";
import Kategori from "./Kategori";
import Transaksi from "./Transaksi";
import Home from "../user/home/Home";
import { Toaster } from "react-hot-toast";
import Pembayaran from "./Pembayaran";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();
  const { slug } = useParams();

  const handleContent = () => {
    switch (slug) {
      case "produk":
        return {
          view: <Product />,
          text: "Produk",
        };
      case "kategori":
        return {
          view: <Kategori />,
          text: "Kategori",
        };
      case "transaksi":
        return {
          view: <Transaksi />,
          text: "Transaksi",
        };
      case "pembayaran":
        return {
          view: <Pembayaran />,
          text: "Pembayaran BCA Transfer",
        };
      case "kembali":
        return {
          view: <Home />,
          text: "Kembali",
        };
      default:
        window.location.href = `/admin/produk`;
        break;
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          route={slug}
          data={data}
          loading={loading}
        />
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="p-4 md:ml-72">
            <h2 className="capitalize font-semibold text-2xl">
              {handleContent().text}
            </h2>
            <div className="mt-4">{handleContent().view}</div>
          </main>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
