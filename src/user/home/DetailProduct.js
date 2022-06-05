import MainButton from "../../components/buttons/MainButton";
import Layout from "../../components/layouts/Layout";
import MainProductList from "../../components/products/MainProductList";
import SimplePricing from "../../components/pricings/SimplePricing";
import { useEffect, useState } from "react";
import apiClient from "../../components/services/ApiClient";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const DetailProduct = () => {
  const [product, setProduct] = useState({});
  const [similiarProducts, setSimiliarProducts] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    const getDetailProduct = () => {
      apiClient()
        .get("/produk/" + slug)
        .then((response) => {
          setProduct(response.data.data.produk);
          setSimiliarProducts(response.data.data.produkSameCategory);
        });
    };

    getDetailProduct();
  }, [slug]);

  const addToCart = () => {
    apiClient()
      .post("/add-produk/" + slug)
      .then((response) => {
        if (response.data.status === 201) {
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
          return false;
        }

        else if (response.data.status === 409)
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
      });
  };

  return (
    <Layout header={true} footer={true}>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={
                process.env.REACT_APP_BACKEND_URL + "/images/" + product.image
              }
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.kategori}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.nama_produk}
              </h1>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex my-auto mt-6">
                <span className="title-font font-medium text-2xl text-gray-900">
                  <SimplePricing value={product.harga} />
                </span>
                <div className={"ml-auto my-auto"}>
                  <MainButton
                    onClick={() => {
                      addToCart();
                    }}
                    label={"Tambah ke Cart"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className={"font-medium text-2xl"}>Similar Products</h1>
          <div className={"my-4"}>
            <MainProductList products={similiarProducts} />
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default DetailProduct;
