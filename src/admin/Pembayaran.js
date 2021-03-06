import MainModal from "../components/modals/MainModal";
import { useCallback, useEffect, useState } from "react";
import PaymentTable from "../components/payments/PaymentTable";
import apiClient from "../components/services/ApiClient";
import SimplePricing from "../components/pricings/SimplePricing";
import InfoModal from "../components/modals/InfoModal";
import { toast } from "react-hot-toast";
import MainButton from "../components/buttons/MainButton";
import MainTextInput from "../components/forms/MainTextInput";
import MainPriceInput from "../components/forms/MainPriceInput";

const Pembayaran = () => {
  const [showDetailPembayaran, setShowDetailPembayaran] = useState(false);
  const [showAddOngkir, setShowAddOngkir] = useState(false);
  const [showEditOngkir, setShowEditOngkir] = useState(false);
  const [editOngkirBiayaNumber, setOngkirBiayaNumber] = useState(0);
  const [pembayaran, setPembayaran] = useState([]);
  const [selectedIdPembayaran, setSelectedIdPembayaran] = useState(0);
  const [selectedPembayaran, setSelectedPembayaran] = useState({
    fullname: "",
    status: "",
    total_harga: 0,
    image: "",
    ongkir: 0,
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

  const deletePembayaranById = useCallback((id) => {
    apiClient()
      .delete("/pembayaran/" + id)
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
          getAllPembayaran();
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

  const callbackEditModal = useCallback(
    (id) => {
      const selectedPembayaran = pembayaran.filter(
        (pembayarans) => pembayarans.id === id
      )[0];

      setSelectedIdPembayaran(id);
      setSelectedPembayaran({
        ...selectedPembayaran,
        ongkir: selectedPembayaran.ongkir,
      });
      setShowEditOngkir(true);
    },
    [pembayaran]
  );

  const addOngkir = () => {};

  const editOngkir = () => {
    apiClient()
      .put("/pembayaran/ongkir/" + selectedIdPembayaran, {
        ongkir: parseInt(
          editOngkirBiayaNumber.toString().replace(/\D/g, "")
          ),
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
          })
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
          })
          setShowEditOngkir(false);
          getAllPembayaran();
        }
      })
  };

  const filteredPelanggan = pembayaran.filter((pembayarans) => {
    return pembayarans.fullname.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
    <MainModal
      handleClose={() => {
        showAddOngkir ? setShowAddOngkir(false) : setShowEditOngkir(false);
      }}
      onClick={() => {
        showAddOngkir ? addOngkir() : editOngkir();
      }}
      showModal={showAddOngkir || showEditOngkir}
      buttonLabel={"Simpan"}
      title={showAddOngkir ? "Tambah Ongkir" : "Edit Ongkir"}
    >
      <MainPriceInput
        label={"Biaya Ongkir"}
        placeholder={`${selectedPembayaran.ongkir === null 
          ? "Rp 0" : `Rp ${selectedPembayaran.ongkir}`}`
        }
        onChange={(e) => {
          setOngkirBiayaNumber(e.target.value);
        }}
      />
    </MainModal>

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
            <span className={"opacity-50"}>Ongkir</span>
            {selectedPembayaran.ongkir === 0 || selectedPembayaran.ongkir === null ? (
              <span className={"ml-4"}>Bebas Ongkir</span>
              ) : (
              <span className={"ml-4"}>{<SimplePricing value={selectedPembayaran.ongkir}/>}</span>
            )}
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
              editOngkir={callbackEditModal}
              deletePembayaranById={deletePembayaranById}
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
              editOngkir={callbackEditModal}
              deletePembayaranById={deletePembayaranById}
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
