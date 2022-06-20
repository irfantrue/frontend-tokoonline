import Layout from "../../components/layouts/Layout";
import MainTextInput from "../../components/forms/MainTextInput";
import MainSelectInput from "../../components/forms/MainSelectInput";
import MainProductList from "../../components/products/MainProductList";
import apiClient from "../../components/services/ApiClient";
import { useEffect, useState } from "react";
import useQuery from "../../components/services/UseQuery";
import MainButton from "../../components/buttons/MainButton";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';


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
      .get("/sort-produk-by-kategori-a-to-z/" + category)
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingNameZtoA = () => {
    apiClient()
      .get("/sort-produk-by-kategori-z-to-a/" + category)
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingLowestPrice = () => {
    apiClient()
      .get("/sort-produk-by-kategori-harga-terendah/" + category)
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingHighestPrice = () => {
    apiClient()
      .get("/sort-produk-by-kategori-harga-tertinggi/" + category)
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, [category]);

  const filteredProducts = products.filter((product) => {
    return product.nama_produk.toLowerCase().includes(search.toLowerCase());
  });

  const buttons = [
    <Button 
      onClick={() => {
        getAllProductSortingNameAtoZ();
      }}
      style={{ borderColor: "gray" }}
    >
      <span style={{ color: "black"}}>A - Z</span>
    </Button>,
    <Button 
      onClick={() => {
        getAllProductSortingNameZtoA();
      }}
      style={{ borderColor: "gray" }}
    >
      <span style={{ color: "black"}}>Z - A</span>    </Button>,
    <Button 
      onClick={() => {
        getAllProductSortingLowestPrice();
      }}
      style={{ borderColor: "gray" }}
    >
      <span style={{ color: "black"}}>Harga Terendah</span>
    </Button>,
    <Button 
      onClick={() => {
        getAllProductSortingHighestPrice();
      }}
      style={{ borderColor: "gray" }}
    >
      <span style={{ color: "black"}}>Harga Tertinggi</span>
    </Button>            
  ]

  return (
    <Layout header={true} footer={true}>
      <div className={"mt-24"}>
        <div className={"search-button justify-center flex gap-2 text-center"}>
          <div className={"my-auto"}>
            <MainSelectInput
              onChange={(e) => {
                setCategory(e.target.value);
                window.history.pushState(``, ``, "products?c=" + e.target.value, "_blank");
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
            <ButtonGroup size="large" color="success" aria-label="large button group">
              {buttons}
            </ButtonGroup>
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
