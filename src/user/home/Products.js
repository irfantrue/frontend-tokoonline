import Layout from "../../components/layouts/Layout";
import MainTextInput from "../../components/forms/MainTextInput";
import MainSelectInput from "../../components/forms/MainSelectInput";
import MainProductList from "../../components/products/MainProductList";
import apiClient from "../../components/services/ApiClient";
import { useEffect, useState } from "react";
import useQuery from "../../components/services/UseQuery";
import MainButton from "../../components/buttons/MainButton";

const Products = () => {
  const query = useQuery();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(query.get("c"));
  const [search, setSearch] = useState("");

  const getAllProducts = () => {
    apiClient()
      .get("/home-produk/" + category)
      .then((response) => {
        setProducts(response.data.msg);
      });
  };

  const getAllCategories = () => {
    apiClient()
      .get("/kategori-home")
      .then((response) => {
        setCategories(response.data.data);
      });
  };

  const getAllProductSortingNameAtoZ = () => {
    apiClient()
      .get("/sorting-nama-produk-a-to-z")
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingNameZtoA = () => {
    apiClient()
      .get("/sorting-nama-produk-z-to-a")
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingLowestPrice = () => {
    apiClient()
      .get("/sorting-harga-produk-terendah")
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingHighestPrice = () => {
    apiClient()
      .get("/sorting-harga-produk-tertinggi")
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    // getAllProductSortingNameAtoZ();
    // getAllProductSortingNameZtoA();
    // getAllProductSortingLowestPrice();
    // getAllProductSortingHighestPrice();
  }, [category]);

  const filteredProducts = products.filter((product) => {
    return product.nama_produk.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Layout header={true} footer={true}>
      <div className={"mt-24"}>
        <div className={"search-button justify-center flex gap-2 text-center"}>
          <div className={"my-auto"}>
            <MainSelectInput
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            >
              {categories.map((category, key) => (
                <option key={key} value={category.slug}>
                  {category.nama_kategori}
                </option>
              ))}
            </MainSelectInput>
          </div>
          <div>
            <MainTextInput
              className={"w-96"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder={"Cari produk"}
            />
          </div>
        </div>
          <div className={"mt-2 flex justify-center"}>
            <MainButton
              onClick={() => {
                getAllProductSortingNameAtoZ();
              }}
              label={"A - Z"}
              className={"mr-2"}
            >
            </MainButton>
            <MainButton
              onClick={() => {
                getAllProductSortingNameZtoA();
              }}
              label={"Z - A"}
              className={"mr-2"}
            >
            </MainButton>
            <MainButton
              onClick={(e) => {
                getAllProductSortingLowestPrice();
              }}
              label={"Harga Terendah"}
              className={"mr-2"}
            >
            </MainButton>
            <MainButton
              onClick={(e) => {
                getAllProductSortingHighestPrice();
              }}
              label={"Harga Tertinggi"}
            >
            </MainButton>
          </div>
        <div className={"md:mt-24 mt-8"}>
          {products.length === 0 ? (
            <p className={"text-center"}>Tidak ada produk</p>
          ) : (
            <MainProductList products={filteredProducts} />
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Products;
