import TransactionTable from "../components/transactions/TransactionTable";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../components/services/ApiClient";
import { toast } from "react-hot-toast";
import InfoModal from "../components/modals/InfoModal";
import SimplePricing from "../components/pricings/SimplePricing";
import MainTextInput from "../components/forms/MainTextInput";
import MainButton from "../components/buttons/MainButton";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  const [search, setSearch] = useState("");
  const [tanggal, setTanggal] = useState({
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    getAllTransaksi();
  }, []);

  const getAllTransaksi = () => {
    apiClient()
      .get("/transaksi")
      .then((response) => {
        setTransactions(response.data.data);
      });
  };

  const getAllTransaksiKodeAToZ = () => {
    apiClient()
      .get("/sort-admin-transaksi-kode-a-to-z")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiKodeZToA = () => {
    apiClient()
      .get("/sort-admin-transaksi-kode-z-to-a")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiProdukAToZ = () => {
    apiClient()
      .get("/sort-admin-transaksi-produk-a-to-z")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiProdukZToA = () => {
    apiClient()
      .get("/sort-admin-transaksi-produk-z-to-a")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiPelangganAToZ = () => {
    apiClient()
      .get("/sort-admin-transaksi-pelanggan-a-to-z")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiPelangganZToA = () => {
    apiClient()
      .get("/sort-admin-transaksi-pelanggan-z-to-a")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiTanggalTerbaru = () => {
    apiClient()
      .get("/sort-admin-transaksi-tanggal-terbaru")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiTanggalTerlama = () => {
    apiClient()
      .get("/sort-admin-transaksi-tanggal-terlama")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiTotalHargaTertinggi = () => {
    apiClient()
      .get("/sort-admin-transaksi-total-harga-tertinggi")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiTotalHargaTerendah = () => {
    apiClient()
      .get("/sort-admin-transaksi-total-harga-terendah")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiStatusAtoZ = () => {
    apiClient()
      .get("/sort-admin-transaksi-status-a-to-z")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const getAllTransaksiStatusZtoA = () => {
    apiClient()
      .get("/sort-admin-transaksi-status-z-to-a")
      .then((response) => {
        setTransactions(response.data.data);
      })
  };

  const editStatusTransaksiCallback = useCallback((id, status) => {
    editStatusTransaksi(id, status);
  }, []);

  const editStatusTransaksi = (id, status) => {
    apiClient()
      .put("/transaksi/" + id, {
        status: status,
      })
      .then((response) => {
        if (response.data.status === 400) {
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
        } 
        
        else {
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
      });
  };

  const downloadFile = () => {
    apiClient()
      .post("/laporan-transaksi-pdf", {
        startDate: tanggal.startDate,
        endDate: tanggal.endDate
      })
      .then((response) => {
        if (response.data.status === 200) {
          let doc = new jsPDF();
  
          let info = [];
  
          for (let i = 0; i < response.data.data.length; i++) {
            info.push([
              response.data.data[i].Produk, 
              response.data.data[i].kodeOrder,
              response.data.data[i].Pembayaran,
              response.data.data[i].Terjual,
              response.data.data[i].Total,
              response.data.data[i].Status,
              response.data.data[i].Tanggal
            ])
          }
  
          autoTable(doc, {
            theme: "grid",
            headStyles: { halign: "center" },
            bodyStyles: { halign: "center" },
            head: [["Produk", "Kode Order", "Pembayaran", "Terjual", "Total", "Status", "Tanggal"]],
            body: info
          })
  
          doc.save("table.pdf")
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
          })
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
          })
        }
      })
      .catch(err => console.log(err))
  };

  const deleteTransaksiById = useCallback((id) => {
    apiClient()
      .delete("/transaksi/" + id)
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
      });
  }, []);

  const detailTransaksiCallback = useCallback((id) => {
    apiClient()
      .get("/transaksi-user/" + id)
      .then((response) => {
        setSelectedTransaksi(response.data.data);
        setShowDetailTransaksi(true);
      });
  }, []);

  const filteredPelanggan = transactions.filter((transaction) => {
    return transaction.fullname.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <InfoModal
        handleClose={() => {
          setShowDetailTransaksi(false);
        }}
        showModal={showDetailTransaksi}
        title={"Detail Transaksi: "+selectedTransaksi.kode_odr}
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

      <div className={"flex justify-between"}>
        <div>
          <MainTextInput
            className={"w-96"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={"Cari pelanggan"}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <MainTextInput
              onChange={(e) => {
                setTanggal({
                  ...tanggal,
                  startDate: e.target.value,
                });
              }}
              type={"datetime-local"}
            />
          </div>
          <p className={"mt-5 mr-3 ml-3"}>S/D</p>
          <div>
            <MainTextInput
              onChange={(e) => {
                setTanggal({
                  ...tanggal,
                  endDate: e.target.value,
                });
              }}
              type={"datetime-local"}
            />
          </div>
          <div>
            <MainButton
              onClick={() => {
                downloadFile();
              }}
              className={"w-full ml-2 mt-3"}
              label={"PDF"}
            />
          </div>
        </div>
      </div>

      <div>
        {transactions.length === 0 ? (
          <TransactionTable
            editStatusTransaksiCallback={editStatusTransaksiCallback}
            deleteTransaksiById={deleteTransaksiById}
            transactions={transactions}
            detailTransaksi={detailTransaksiCallback}
            sortKodeAToZ={getAllTransaksiKodeAToZ}
            sortKodeZToA={getAllTransaksiKodeZToA}
            sortProdukAToZ={getAllTransaksiProdukAToZ}
            sortProdukZToA={getAllTransaksiProdukZToA}
            sortPelangganAToZ={getAllTransaksiPelangganAToZ}
            sortPelangganZToA={getAllTransaksiPelangganZToA}
            sortTanggalTerbaru={getAllTransaksiTanggalTerbaru}
            sortTanggalTerlama={getAllTransaksiTanggalTerlama}
            sortTotalHargaTertinggi={getAllTransaksiTotalHargaTertinggi}
            sortTotalHargaTerendah={getAllTransaksiTotalHargaTerendah}
            sortStatusAToZ={getAllTransaksiStatusAtoZ}
            sortStatusZtoA={getAllTransaksiStatusZtoA}
          />
        ) : (
          <TransactionTable
            editStatusTransaksiCallback={editStatusTransaksiCallback}
            deleteTransaksiById={deleteTransaksiById}
            transactions={filteredPelanggan}
            detailTransaksi={detailTransaksiCallback}
            sortKodeAToZ={getAllTransaksiKodeAToZ}
            sortKodeZToA={getAllTransaksiKodeZToA}
            sortProdukAToZ={getAllTransaksiProdukAToZ}
            sortProdukZToA={getAllTransaksiProdukZToA}
            sortPelangganAToZ={getAllTransaksiPelangganAToZ}
            sortPelangganZToA={getAllTransaksiPelangganZToA}
            sortTanggalTerbaru={getAllTransaksiTanggalTerbaru}
            sortTanggalTerlama={getAllTransaksiTanggalTerlama}
            sortTotalHargaTertinggi={getAllTransaksiTotalHargaTertinggi}
            sortTotalHargaTerendah={getAllTransaksiTotalHargaTerendah}
            sortStatusAToZ={getAllTransaksiStatusAtoZ}
            sortStatusZToA={getAllTransaksiStatusZtoA}
          />
        )}
      </div>
    </>
  );
};
export default Transaksi;
