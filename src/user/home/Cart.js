import Layout from "../../components/layouts/Layout";
import CartTable from "../../components/carts/CartTable";
import MainRadioButton from "../../components/forms/MainRadioButton";
import MainTextInput from "../../components/forms/MainTextInput";
import MainTextArea from "../../components/forms/MainTextArea";
import MainButton from "../../components/buttons/MainButton";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../components/services/ApiClient";
import SimplePricing from "../../components/pricings/SimplePricing";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [carts, setAllCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkoutDetail, setCheckoutDetail] = useState({
    dateProdukShipping: "",
    shippingAddress: "",
    paymentMethod: "",
  });

  useEffect(() => {
    getAllCart();
  }, []);

  const loadClassCallback = useCallback(() => {
    getAllCart();
  }, []);

  const getAllCart = () => {
    apiClient()
      .get("/cart")
      .then((response) => {
        if (response.data.status === 404) {
          setAllCarts([]);
          setTotal(0);

          return false;
        }
        setAllCarts(response.data.data.produk);
        setTotal(response.data.data.total ?? 0);
      });
  };

  const deleteCart = (productSlug) => {
    apiClient()
      .delete("/delete-cart/" + productSlug)
      .then((response) => {
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
        console.log(response.data);
        getAllCart();
      });
  };

  const handleCheckout = () => {
    if (checkoutDetail.paymentMethod && checkoutDetail.shippingAddress) {
      setLoading(true);
      apiClient()
        .post("/cart/checkout", {
          tanggalJadiPesanan: checkoutDetail.dateProdukShipping,
          alamat_tujuan: checkoutDetail.shippingAddress,
          pembayaran: checkoutDetail.paymentMethod,
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
            };
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
          
          else if (response.data.status === 201) {
            setLoading(false);
            window.location.href = "transaksi";
          }
        });
    } else {
      toast.error("Data harus lengkap!", {
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
  };

  return (
    <Layout header={true} footer={true}>
      <div>
        <h1 className={"font-medium text-2xl"}>Cart</h1>
        <div className={"grid grid-cols-3 gap-8"}>
          <div className={"col-span-2"}>
            <CartTable
              loadClassCallback={loadClassCallback}
              deleteCart={deleteCart}
              products={carts}
            />
          </div>
          <div className={"col-span-1"}>
            <div className={"bg-gray-100 p-4 rounded-lg"}>
              <div className={"py-4 border-b border-gray-300"}>
                <h1 className={"text-xl font-medium"}>Rincian</h1>
              </div>
              <div className={"mt-8"}>
                <h1 className={"text-lg font-medium"}>Pembayaran</h1>
                <div className={"mt-4"}>
                  <MainRadioButton
                    onChange={(e) => {
                      setCheckoutDetail({
                        ...checkoutDetail,
                        paymentMethod: e.target.value,
                      });
                    }}
                    value={"BCA Transfer"}
                    label={"BCA Transfer"}
                    name={"payment"}
                  />
                  <MainRadioButton
                    onChange={(e) => {
                      setCheckoutDetail({
                        ...checkoutDetail,
                        paymentMethod: e.target.value,
                      });
                    }}
                    value={"Cash on Delivery"}
                    label={"COD"}
                    name={"payment"}
                  />
                </div>
              </div>
              <div className={"mt-8 pb-4"}>
                <h1 className={"text-lg font-medium"}>Tanggal Pengiriman (Minimal: 3hari)</h1>
                <div className={"mt-4"}>
                  <MainTextInput
                    onChange={(e) => {
                      setCheckoutDetail({
                        ...checkoutDetail,
                        dateProdukShipping: e.target.value,
                      });
                    }}
                    type={"datetime-local"}
                  />
                </div>
              </div>
              <div className={"mt-8 border-b border-gray-300 pb-4"}>
                <h1 className={"text-lg font-medium"}>Alamat Pengiriman</h1>
                <div className={"mt-4"}>
                  <MainTextArea
                    onChange={(e) => {
                      setCheckoutDetail({
                        ...checkoutDetail,
                        shippingAddress: e.target.value,
                      });
                    }}
                    placeholder={"Masukkan alamat pengirimanmu"}
                  />
                </div>
              </div>
              <div className={"py-4"}>
                <div className={"flex justify-between"}>
                  <div>
                    <h1 className={"font-medium text-lg"}>Total</h1>
                  </div>
                  <div>
                    <h1 className={"font-medium text-lg"}>
                      <SimplePricing value={total} />
                    </h1>
                  </div>
                </div>
                <div className={"mt-4"}>
                  <MainButton
                    onClick={() => {
                      handleCheckout();
                    }}
                    className={"w-full"}
                    label={loading ? "Loading..." : "Checkout"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
