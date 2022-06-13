import Layout from "../../components/layouts/Layout";
import DangerButton from "../../components/buttons/DangerButton";
import MainButton from "../../components/buttons/MainButton";
import { useEffect, useState, useCallback } from "react";
import apiClient from "../../components/services/ApiClient";
import SimplePricing from "../../components/pricings/SimplePricing";
import { toast } from "react-hot-toast";
import InfoModal from "../../components/modals/InfoModal";

const Transaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showDetailTransaksi, setShowDetailTransaksi] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState({
    nama_user: "",
    phone: "",
    alamat_1: "",
    alamat_2: "",
    pembayaran: "",
    image: "",
    harga_produk: 0,
    total_harga: 0,
    status: "",
    jumlah: 0,
    tgl_pengiriman: "",
    tgl_pembelian: "",
    nama_produk: ""
  });

  useEffect(() => {
    getAllTransaksi();
  }, []);

  const getAllTransaksi = () => {
    apiClient()
      .get("/transaksi-user")
      .then((response) => {
        if (response.data.status === 200) {
          setTransaksi(response.data.data);
        } else {
          setTransaksi([]);
        }
      });
  };

  const deleteTransaksi = (id) => {
    apiClient()
      .delete("/transaksi-user/" + id)
      .then((response) => {
        if (response.data.status === 200) {
          toast.success(response.data.msg, {
            position: "top-right",
            iconTheme: {
              primary: "white",
              secondary: "#0F9D58"
            },
            style: {
              background: "#0F9D58",
              color: "white"
            }
          });
          getAllTransaksi();
        }

        else if (response.data.status === 404) {
          toast.error(response.data.msg, {
            position: "top-right",
            iconTheme: {
              primary: "white",
              secondary: "red"
            },
            style: {
              background: "#FF3727",
              color: "white"
            }  
          });
          getAllTransaksi();
        }

        else if (response.data.status === 400) {
          toast.error(response.data.msg, {
            position: "top-right",
            iconTheme: {
              primary: "white",
              secondary: "red"
            },
            style: {
              background: "#FF3727",
              color: "white"
            }  
          });
          getAllTransaksi();
        }

      });
  };

  const detailTransaksiCallback = useCallback((id) => {
    apiClient()
      .get("/transaksi-user/" + id)
      .then((response) => {
        setSelectedTransaksi(response.data.data);
        setShowDetailTransaksi(true);
      })
  }, []);

  return (
    <Layout header={true} footer={true}>

      <InfoModal
        handleClose={() => {
          setShowDetailTransaksi(false);
        }}
        showModal={showDetailTransaksi}
        title={"Detail Transaksi:"+selectedTransaksi.kode_odr}
      >
        <div className={"p-5 shadow"}>
          <div>
            <h1 className={"font-medium"}>{selectedTransaksi.status}</h1>
          </div>
          <div className={"mt-5 flex justify-between"}>
            <span className={"opacity-50"}>Tanggal Pembelian</span>
            <span className={"ml-4"}>{selectedTransaksi.tgl_pembelian}</span>
          </div>
          <div className={"mt-5 flex justify-between"}>
            <span className={"opacity-50"}>Tanggal Pengiriman</span>
            <span className={"ml-4"}>{selectedTransaksi.tgl_pengiriman}</span>
          </div>
        </div>

        <div className={"mt-3 p-5 shadow"}>
          <h1 className={"font-medium"}>Detail Produk</h1>
          <div className={"mt-2 p-5 shadow rounded-pill"}>
            <div className={"flex justify-between"}>
              <div className={"flex gap-2"}>
                <div>
                  <img 
                    className={"w-12 h-12"}
                    src={ process.env.REACT_APP_BACKEND_URL +
                      "/images/" + 
                      selectedTransaksi.image}
                    alt={"Image"}
                    />
                </div>
                <div className={"ml-2"}>
                  <h1 className={"font-medium"}>{selectedTransaksi.nama_produk}</h1>
                  <p className={"opacity-50"}>
                    {selectedTransaksi.jumlah} X <SimplePricing value={selectedTransaksi.harga_produk}/>
                  </p>
                </div>
              </div>
              <div className={"flex"}>
                <div>
                  <h1>Total Harga</h1>
                  <h1 className={"font-medium text-center"}><SimplePricing value={selectedTransaksi.total_harga}/></h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"mt-3 p-5 shadow"}>
          <h1 className={"font-medium"}>Info Pengiriman</h1>
          <div className={"mt-5"}>
            <span className={"opacity-50"}>Nama</span>
            <span className={"ml-10 opacity-50"}>:</span>
            <span className={"ml-4"}>{selectedTransaksi.nama_user}</span>
          </div>
          <div className={"mt-5"}>
            <span className={"opacity-50"}>Telepon</span>
            <span className={"ml-6 opacity-50"}>:</span>
            <span className={"ml-4"}>{selectedTransaksi.phone}</span>
          </div>
          <div className={"mt-5"}>
            <span className={"opacity-50"}>Alamat 1</span>
            <span className={"ml-5 opacity-50"}>:</span>
            <span className={"ml-4"}>{selectedTransaksi.alamat_1}</span>
          </div>
          <div className={"mt-5"}>
            <span className={"opacity-50"}>Alamat 2</span>
            <span className={"ml-4 opacity-50"}>:</span>
            <span className={"ml-4"}>{selectedTransaksi.alamat_2}</span>
          </div>
        </div>

        <div className={"mt-3 p-5 shadow"}>
          <h1 className={"font-medium"}>Rincian Pembayaran</h1>
          <div className={"mt-5 flex justify-between"}>
            <span className={"opacity-50"}>Metode Pembayaran</span>
            <span className={"ml-4"}>{selectedTransaksi.pembayaran}</span>
          </div>
          <div className={"mt-5 flex justify-between"}>
            <span className={"opacity-50"}>Total Harga (1 barang)</span>
            <span className={"ml-4"}><SimplePricing value={selectedTransaksi.harga_produk}/></span>
          </div>
          <div className={"mt-5 flex justify-between"}>
            <h1 className={"font-medium"}>Total Belanja</h1>
            <h1 className={"ml-4 font-medium"}><SimplePricing value={selectedTransaksi.total_harga}/></h1>
          </div>
        </div>

      </InfoModal>

      <div>
        <h1 className={"font-medium text-2xl"}>Transaksi</h1>
        {transaksi.map((trans, key) => (
          <div className={"p-4 bg-white-100 rounded-lg mt-2 border shadow-lg p-3 mb-5 bg-body rounded"} key={key}>
            <div className={"flex justify-between"} key={key}>
              <div className={"flex gap-2"}>
                <div className={"border w-40 h-32"}>
                  <img
                    className={"h-32"}
                    src={
                      process.env.REACT_APP_BACKEND_URL +
                      "/images/" +
                      trans.image
                    }
                    alt={"Product Image"}
                  />
                </div>
                <div>
                  <div className={"flex justify-start"}>
                    <div>
                      <p className={"font-semibold text-medium"}>
                        Belanja
                      </p>
                    </div>
                    <div className={"ml-3"}>
                      {trans.tgl_pembelian}
                    </div>
                    {trans.status === "Selesai" ? (
                          <div className={"ml-3 px-2 bg-green-100 text-green-800 font-semibold rounded"}>
                            <p>{trans.status}</p>
                          </div>
                        ) : <div className="ml-3 px-2 bg-yellow-100 text-yellow-800 font-semibold rounded">
                          <p>{trans.status}</p>
                          </div>
                    }
                  </div>
                  <div className={"mt-5 font-semibold"}>
                    <h1>{trans.nama_produk}</h1>
                  </div>
                  <div className={"mt-5 opacity-50"}>
                    <p>{trans.jumlah} Produk X <SimplePricing value={trans.harga} /></p>
                  </div>
                </div>
              </div>
              <div className={"mt-12 mr-10"}>
                <div className={"mb-12 text-center"}>
                    <p>
                      Total Belanja
                    </p>
                    <div>
                      <p>
                        <SimplePricing value={trans.total_harga} />
                      </p>
                    </div>
                </div>

                <MainButton
                  onClick={() => {
                    detailTransaksiCallback(trans.id)
                  }}
                  label={"Detail"}
                  className={"mr-5"}
                />

                <DangerButton
                  onClick={() => {
                    deleteTransaksi(trans.id);
                  }}
                  label={"Batalkan"}
                />
              </div>
            </div>
          </div>
        ))}
        <div>
          {transaksi.length === 0 ? (
            <div>
              <h1 className={"text-center"}>Belum ada data</h1>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
export default Transaksi;
