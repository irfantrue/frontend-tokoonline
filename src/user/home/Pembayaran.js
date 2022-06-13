import Layout from "../../components/layouts/Layout";
import SimplePricing from "../../components/pricings/SimplePricing";
import MainButton from "../../components/buttons/MainButton";
import MainModal from "../../components/modals/MainModal";
import InfoModal from "../../components/modals/InfoModal";
import { useCallback, useEffect, useState } from "react";
import MainTextInput from "../../components/forms/MainTextInput";
import apiClient from "../../components/services/ApiClient";
import { toast } from "react-hot-toast";
import ProgressBar from "../../components/progress/ProgressBar";

const Pembayaran = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedId, setSelectedId] = useState(0);
  const [pembayaran, setPembayaran] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [buktiPembayaran, setBuktiPembayaran] = useState({
    image: "",
    imageUrl: "",
  });
  const [showDetailPembayaran, setShowDetailPembayaran] = useState(false);
  const [selectedPembayaran, setSelectedPembayaran] = useState({
    image: "",
    status: "",
    total_harga: "",
    no_rek: "",
  });

  useEffect(() => {
    getAllPembayaran();
  }, []);

  const getAllPembayaran = () => {
    apiClient()
      .get("/pembayaran-user")
      .then((response) => {
        if (response.data.status === 404) {
          return false;
        }
        else if (response.data.status === 200) {
          setPembayaran(response.data.data)
        }
        else {
          setPembayaran([]);
        }
      });
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    setBuktiPembayaran({
      ...buktiPembayaran,
      image: file,
      imageUrl: URL.createObjectURL(file),
    });

    setUploading(true);

    apiClient()
      .post("/upload-image", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setUploadProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response.data.status === 400) {
          toast.error(response.data.msg);
          return false;
        }

        setUploadedImage(response.data.data.filename);
        setUploading(false);
      });
  };

  const saveImage = () => {
    apiClient()
      .put("/pembayaran-user/" + selectedId, {
        image: uploadedImage,
      })
      .then((response) => {
        if (response.data.status === 400) {
          for (let i = 0; i < response.data.msg.length; i++) {
            toast.error(response.data.msg[i].message, {
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
          setShowModal(false);
        }

        else if (response.data.status === 200) {
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
          setShowModal(false);
        }
      });
      getAllPembayaran();
  };

  const detailPembayaranCallback = useCallback((id) => {
    apiClient()
      .get("/pembayaran/" + id)
      .then((response) => {
        if(response.data.status === 200) {
          setSelectedPembayaran(response.data.data);
          setShowDetailPembayaran(true);
        }

        else if(response.data.status === 404) {
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
          setShowDetailPembayaran(false);
        }
      })
  }, [])

  return (
    <Layout header={true} footer={true}>

      <InfoModal
        handleClose={() => {
          setShowDetailPembayaran(false);
        }}
        showModal={showDetailPembayaran}
        title={"Detail Pembayaran:"+selectedPembayaran.kode_pby}
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

      <MainModal
        onClick={() => {
          saveImage();
        }}
        showModal={showModal}
        buttonLabel={"Simpan"}
        title={"Upload Bukti Pembayaran"}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <div className={buktiPembayaran.imageUrl ? "flex gap-2" : null}>
          <MainTextInput
            onChange={(e) => {
              handleUploadFile(e);
            }}
            type={"file"}
          />
          {buktiPembayaran.imageUrl ? (
            <div>
              <img
                className={"w-20 h-20 object-cover"}
                src={buktiPembayaran.imageUrl}
                alt={"Product Image"}
              />
            </div>
          ) : null}
        </div>
        {isUploading ? <ProgressBar value={uploadProgress} /> : null}
      </MainModal>

      <div>
        <h1 className={"font-medium text-2xl"}>Pembayaran</h1>
        {pembayaran.map((trans, key) => (
          <div className={"p-4 bg-white-100 rounded-lg mt-2 border shadow-lg p-3 mb-5 bg-body rounded"} key={key}>
            <div className={"flex justify-between"} key={key}>
              <div className={"flex gap-2"}>
                <div>
                  <div>
                    <div className={"flex justify-start"}>
                      <div>
                        <p className={"font-semibold text-medium"}>
                          Pembayaran
                        </p>
                      </div>
                      <div className={"ml-3"}>
                        22/02/2022
                      </div>
                        {trans.status === "Lunas" ? (
                            <div className={"ml-3 px-2 bg-green-100 text-green-800 font-semibold rounded"}>
                              <p>{trans.status}</p>
                            </div>
                        ) : <div className={"ml-3 px-2 bg-yellow-100 text-yellow-800 font-semibold rounded"}>
                              <p>{trans.status}</p>
                            </div>
                        }
                    </div>
                    <div>
                      <h1 className={"font-semibold mt-2"}>{trans.desc}</h1>
                    </div>
                    <div>
                      <p>
                        Total Bayar: <SimplePricing value={trans.total_harga} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"mt-auto"}>
                <MainButton
                  onClick={() => {
                    detailPembayaranCallback(trans.id)
                  }}
                  label={"Detail"}
                  className={"mr-2"}
                />

                <MainButton
                  onClick={() => {
                    setShowModal(true);
                    setSelectedId(trans.id);
                  }}
                  label={`${trans.image ? "Edit" : "Kirim"} Bukti Pembayaran`}
                />
                {trans.image ? (
                  <img
                  className="h-20 w-40"
                  src={
                    process.env.REACT_APP_BACKEND_URL + "/images/" + trans.image
                  }
                  alt={trans.image}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ))}
        <div>
          {pembayaran.length === 0 ? (
            <div>
              <h1 className={"text-center"}>Belum ada data</h1>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
export default Pembayaran;
