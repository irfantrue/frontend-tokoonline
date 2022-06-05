import Layout from "../../components/layouts/Layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MainProductList from "../../components/products/MainProductList";
import { useEffect, useState } from "react";
import apiClient from "../../components/services/ApiClient";
import RoundedBadge from "../../components/badges/RoundedBadge";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const getAllProducts = () => {
    apiClient()
      .get("/home-produk")
      .then((response) => {
        setProducts(response.data.data.new_produk);
      });
  };

  const getAllCategories = () => {
    apiClient()
      .get("/kategori-home")
      .then((response) => {
        setCategories(response.data.data);
      });
  };

  const searchProductByCategory = (categorySlug) => {
    window.open("products?c=" + categorySlug, "_blank");
  };

  return (
    <Layout header={true} footer={true}>
      <Carousel showThumbs={false}>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/banners/banner-home.png"}
            alt={"Banner-1"}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/banners/banner-home.png"}
            alt={"Banner-2"}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/banners/banner-home.png"}
            alt={"Banner-3"}
          />
        </div>
      </Carousel>
      <div className={"my-12"}>
        <h1 className={"font-medium text-2xl"}>Kategori</h1>
        <div className={"flex justify-center gap-3"}>
          {categories.map((category, key) => (
            <RoundedBadge
              onClick={() => {
                searchProductByCategory(category.slug);
              }}
              key={key}
            >
              {category.nama_kategori}
            </RoundedBadge>
          ))}
        </div>
      </div>
      <div className={"products my-12"}>
        <h1 className={"font-medium text-2xl"}>Produk</h1>
        <div className={"my-4"}>
          <MainProductList products={products} />
        </div>
      </div>
    </Layout>
  );
};
export default Home;
