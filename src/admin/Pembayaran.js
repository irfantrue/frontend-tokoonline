import MainModal from "../components/modals/MainModal";
import { useCallback, useEffect, useState } from "react";
import PaymentTable from "../components/payments/PaymentTable";
import apiClient from "../components/services/ApiClient";
import SimplePricing from "../components/pricings/SimplePricing";
import InfoModal from "../components/modals/InfoModal";
import { toast } from "react-hot-toast";
import MainButton from "../components/buttons/MainButton";
import MainTextInput from "../components/forms/MainTextInput";

const Pembayaran = () => {
  const [showDetailPembayaran, setShowDetailPembayaran] = useState(false);
  const [pembayaran, setPembayaran] = useState([]);
  const [selectedPembayaran, setSelectedPembayaran] = useState({
    fullname: "",
    status: "",
    total_harga: 0,
    image: "",
    no_rek: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllPembayaran();
  }, []);

  const getAllPembayaran = () => {
    apiClient()
      .get("/pembayaran")
      .then((response) => {
        if (response.data.status === 404) {
          return false;
        }
        setPembayaran(response.data.data);
      });
  };

  const sortPembayaranKodeAToZ = () => {
    apiClient()
      .get("/sort-admin-pembayaran-kode-a-to-z")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortPembayaranKodeZToA = () => {
    apiClient()
      .get("/sort-admin-pembayaran-kode-z-to-a")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortDetailAToZ = () => {
    apiClient()
      .get("/sort-admin-pembayaran-detail-a-to-z")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortDetailZToA = () => {
    apiClient()
      .get("/sort-admin-pembayaran-detail-z-to-a")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortTeleponTertinggi = () => {
    apiClient()
      .get("/sort-admin-pembayaran-telepon-tertinggi")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortTeleponTerendah = () => {
    apiClient()
      .get("/sort-admin-pembayaran-telepon-terendah")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortNamaAToZ = () => {
    apiClient()
      .get("/sort-admin-pembayaran-nama-a-to-z")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortNamaZToA = () => {
    apiClient()
      .get("/sort-admin-pembayaran-nama-z-to-a")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortTotalHargaTertinggi = () => {
    apiClient()
      .get("/sort-admin-pembayaran-total-harga-tertinggi")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortTotalHargaTerendah = () => {
    apiClient()
      .get("/sort-admin-pembayaran-total-harga-terendah")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortStatusAToZ= () => {
    apiClient()
      .get("/sort-admin-pembayaran-status-a-to-z")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const sortStatusZToA = () => {
    apiClient()
      .get("/sort-admin-pembayaran-status-z-to-a")
      .then((response) => {
        setPembayaran(response.data.data);
      })
  };

  const editCallback = useCallback((paymentId, value) => {
    apiClient()
      .put("/pembayaran/" + paymentId, {
        status: value,
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
          getAllPembayaran();
        }
      });
  }, []);

  const detailPaymentCallback = useCallback((id) => {
    apiClient()
      .get("/pembayaran/" + id)
      .then((response) => {
        setSelectedPembayaran(response.data.data);
        setShowDetailPembayaran(true);
      });
  }, []);

  const filteredPelanggan = pembayaran.filter((pembayarans) => {
    return pembayarans.fullname.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>

<InfoModal
        handleClose={() => {
          setShowDetailPembayaran(false);
        }}
        showModal={showDetailPembayaran}
        title={"Detail Pembayaran: "+selectedPembayaran.kode_pby}
      >
        <div className={"p-5 shadow"}>
          <div>
            <h1 className={"font-medium text-center"}>Bukti Transfer</h1>
          </div>
          <div className={"mt-5 justify-center border"}>
              <img
                className={""}
                style={{height: "400px"}}
                src={
                  process.env.REACT_APP_BACKEND_URL + "/images/" + selectedPembayaran.image
                }
              />
          </div>
        </div>

        <div className={"mt-3 p-5 shadow"}>
          <div className={"flex justify-start"}>
            <h1 className={"font-medium"}>Info Pembayaran</h1>
            {selectedPembayaran.status === "Lunas" ? (
              <div className={"ml-3 px-2 bg-green-100 text-green-800 font-semibold rounded"}>
                <p>{selectedPembayaran.status}</p>
              </div>
              ) : <div className="ml-3 px-2 bg-yellow-100 text-yellow-800 font-semibold rounded">
                <p>{selectedPembayaran.status}</p>
              </div>
            }
          </div>
          <div className={"mt-5 flex justify-between"}>
            <span className={"opacity-50"}>Metode Pembayaran</span>
            <span className={"ml-4"}>BCA Transfer</span>
          </div>
          <div className={"mt-5 flex justify-between"}>
            <span className={"opacity-50"}>Transfer Rekening</span>
            <span className={"ml-4"}>{selectedPembayaran.no_rek}</span>
          </div>
          <div className={"mt-5 flex justify-between"}>
            <h1 className={"font-medium"}>Total Belanja</h1>
            <h1 className={"ml-4 font-medium"}><SimplePricing value={selectedPembayaran.total_harga}/></h1>
          </div>
        </div>
      </InfoModal>

      <div className={"flex jutify-between"}>
        <MainTextInput
          className={"w-96"}
          onChange={(e) => {
          setSearch(e.target.value);
          }}
          placeholder={"Cari pelanggan"}
        />        
      </div>
      <div>
        <div className={"mt-4"}>
          {pembayaran.length === 0 ? (
            <PaymentTable
              detailPayment={detailPaymentCallback}
              editStatusPembayaranCallback={editCallback}
              pembayarans={pembayaran}
              sortKodeAToZ={sortPembayaranKodeAToZ}
              sortKodeZToA={sortPembayaranKodeZToA}
              sortDetailAToZ={sortDetailAToZ}
              sortDetailZToA={sortDetailZToA}
              sortTeleponTertinggi={sortTeleponTertinggi}
              sortTeleponTerendah={sortTeleponTerendah}
              sortNamaAToZ={sortNamaAToZ}
              sortNamaZToA={sortNamaZToA}
              sortTotalHargaTertinggi={sortTotalHargaTertinggi}
              sortTotalHargaTerendah={sortTotalHargaTerendah}
              sortStatusAToZ={sortStatusAToZ}
              sortStatusZToA={sortStatusZToA}
            />
          ) : (
            <PaymentTable
              detailPayment={detailPaymentCallback}
              editStatusPembayaranCallback={editCallback}
              pembayarans={filteredPelanggan}
              sortKodeAToZ={sortPembayaranKodeAToZ}
              sortKodeZToA={sortPembayaranKodeZToA}
              sortDetailAToZ={sortDetailAToZ}
              sortDetailZToA={sortDetailZToA}
              sortTeleponTertinggi={sortTeleponTertinggi}
              sortTeleponTerendah={sortTeleponTerendah}
              sortNamaAToZ={sortNamaAToZ}
              sortNamaZToA={sortNamaZToA}
              sortTotalHargaTertinggi={sortTotalHargaTertinggi}
              sortTotalHargaTerendah={sortTotalHargaTerendah}
              sortStatusAToZ={sortStatusAToZ}
              sortStatusZToA={sortStatusZToA}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Pembayaran;
