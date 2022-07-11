import TableProduct from "../components/products/TableProduct";
import MainButton from "../components/buttons/MainButton";
import MainModal from "../components/modals/MainModal";
import MainTextInput from "../components/forms/MainTextInput";
import MainSelectInput from "../components/forms/MainSelectInput";
import MainTextArea from "../components/forms/MainTextArea";
import MainPriceInput from "../components/forms/MainPriceInput";
import { useCallback, useEffect, useState } from "react";
import ProgressBar from "../components/progress/ProgressBar";
import apiClient from "../components/services/ApiClient";
import { toast } from "react-hot-toast";

const Product = (callback, deps) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [productImage, setProductImage] = useState({
    image: null,
    imageUrl: null,
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    slug: "",
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: "",
    productImage: "",
  });
  const [search, setSearch] = useState("");

  const getAllProductSortingKodeAtoZ = () => {
    apiClient()
      .get("/sorting-produk-kode-a-to-z")
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingKodeZtoA = () => {
    apiClient()
      .get("/sorting-produk-kode-z-to-a")
      .then((response) => {
        setProducts(response.data.data);
      })
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

  const getAllProductSortingKategoriAtoZ = () => {
    apiClient()
      .get("/sorting-nama-kategori-a-to-z")
      .then((response) => {
        setProducts(response.data.data);
      })
  };

  const getAllProductSortingKategoriZtoA = () => {
    apiClient()
      .get("/sorting-nama-kategori-z-to-a")
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


  const getAllProducts = () => {
    apiClient()
      .get("/produk")
      .then((response) => {
        setProducts(response.data.data);
      });
  };

  const getAllCategories = () => {
    apiClient()
      .get("/kategori")
      .then((response) => {
        setCategories(response.data.data);
      });
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  const callbackEditProduct = useCallback(
    (productSlug) => {
      const selectedProduct = products.filter(
        (product) => product.slug === productSlug
      )[0];

      setSelectedProduct({
        ...selectedProduct,
        slug: selectedProduct.slug,
        productName: selectedProduct.nama_produk,
        productDescription: selectedProduct.desc,
        productCategory: selectedProduct.kategori,
        productPrice: selectedProduct.harga,
        productImage: selectedProduct.image,
      });
      setShowEditProductModal(true);
    },
    [productImage, products]
  );

  const handleAddModal = () => {
    setSelectedProduct({
      productName: "",
      productPrice: "",
      productImage: "",
      productCategory: "",
      productDescription: "",
    });

    setShowAddProductModal(true);
  };

  const saveProduct = () => {
    apiClient()
      .post("/produk", {
        nama_produk: selectedProduct.productName,
        id_kategori: parseInt(selectedProduct.productCategory),
        desc: selectedProduct.productDescription,
        harga: parseInt(
          selectedProduct.productPrice.toString().replace(/\D/g, "")
        ),
        image: selectedProduct.productImage,
      })
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
          })
          setShowAddProductModal(false);
          getAllProducts();
        } 
        
        else if (response.data.status === 400) {
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
        }

        else if (response.data.status === 409) {
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

      });
  };

  const editProduct = () => {
    apiClient()
      .put("/produk/" + selectedProduct.slug, {
        nama_produk: selectedProduct.productName,
        id_kategori: parseInt(selectedProduct.productCategory),
        desc: selectedProduct.productDescription,
        harga: parseInt(
          selectedProduct.productPrice.toString().replace(/\D/g, "")
        ),
        image: selectedProduct.productImage,
      })
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
          setShowEditProductModal(false);
          getAllProducts();
        }

        else if (response.data.status === 400) {
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
        }

        else if (response.data.status === 409) {
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

      });
  };

  const deleteProduct = useCallback((slug) => {
    apiClient()
      .delete("/produk/" + slug)
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
          getAllProducts();
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
          getAllProducts();
        }
      });
  }, []);

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    setProductImage({
      ...productImage,
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
        } else {
          setSelectedProduct({
            ...selectedProduct,
            productImage: response.data.data.filename,
          });
        }
        setUploading(false);
      });
  };

  const handleSaveModal = () => {
    showAddProductModal ? saveProduct() : editProduct();
  };

  const filteredNamaProduk = products.filter((product) => {
    return product.nama_produk.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <MainModal
        buttonLabel={"Simpan"}
        showModal={showAddProductModal || showEditProductModal}
        title={
          showAddProductModal
            ? "Tambah Produk"
            : `Edit Produk: ${selectedProduct.productName}`
        }
        handleClose={() => {
          showAddProductModal
            ? setShowAddProductModal(false)
            : setShowEditProductModal(false);
        }}
        onClick={() => {
          handleSaveModal();
        }}
      >
        <MainTextInput
          label={"Nama Produk"}
          placeholder={"Contoh: Cake with mozarela cheese"}
          value={selectedProduct.productName}
          onChange={(e) => {
            setSelectedProduct({
              ...selectedProduct,
              productName: e.target.value,
            });
          }}
        />
        <MainSelectInput
          label={"Kategori"}
          value={selectedProduct.productCategory}
          onChange={(e) => {
            setSelectedProduct({
              ...selectedProduct,
              productCategory: e.target.value,
            });
          }}
        >
          <option value={""}>{selectedProduct.productCategory}</option>
          {categories.map((category, key) => (
            <option key={key} value={category.id}>
              {category.nama_kategori}
            </option>
          ))}
        </MainSelectInput>
        <MainTextArea
          label={"Deskripsi"}
          placeholder={"Kue terbuat dari..."}
          value={selectedProduct.productDescription}
          onChange={(e) => {
            setSelectedProduct({
              ...selectedProduct,
              productDescription: e.target.value,
            });
          }}
        />
        <MainPriceInput
          label={"Harga"}
          placeholder={"Rp100.000"}
          value={selectedProduct.productPrice}
          onChange={(e) => {
            setSelectedProduct({
              ...selectedProduct,
              productPrice: e.target.value,
            });
          }}
        />
        <div
          className={
            productImage.imageUrl || selectedProduct.productImage
              ? "flex gap-2"
              : null
          }
        >
          <MainTextInput
            onChange={(e) => {
              handleUploadFile(e);
            }}
            type={"file"}
            label={"Gambar Produk"}
          />
          {productImage.imageUrl || selectedProduct.productImage ? (
            <div>
              <img
                className={"w-20 h-20 object-cover"}
                src={
                  productImage.imageUrl
                    ? productImage.imageUrl
                    : process.env.REACT_APP_BACKEND_URL +
                      "/images/" +
                      selectedProduct.productImage
                }
                alt={"Product Image"}
              />
            </div>
          ) : null}
        </div>
        {isUploading ? <ProgressBar value={uploadProgress} /> : null}
      </MainModal>
      <div className={"flex justify-between"}>
        <div>
          <MainTextInput
            className={"w-96"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={"Cari produk"}
          />
        </div>
        <div>
          <MainButton
            onClick={() => {
              handleAddModal();
            }}
            label={"Tambah Produk"}
          />
        </div>
      </div>

      <div>
        {products.length === 0 ? (
          <TableProduct
            products={products}
            deleteProduct={deleteProduct}
            callbackEditProduct={callbackEditProduct}
            sortingKodeAtoZ={getAllProductSortingKodeAtoZ}
            sortingKodeZtoA={getAllProductSortingKodeZtoA}
            sortingAtoZ={getAllProductSortingNameAtoZ}
            sortingZtoA={getAllProductSortingNameZtoA}
            sortingKategoriAtoZ={getAllProductSortingKategoriAtoZ}
            sortingKategoriZtoA={getAllProductSortingKategoriZtoA}
            sortingLowestPrice={getAllProductSortingLowestPrice}
            sortingHighestPrice={getAllProductSortingHighestPrice}
          />
        ) : (
          <TableProduct
            products={filteredNamaProduk}
            deleteProduct={deleteProduct}
            callbackEditProduct={callbackEditProduct}
            sortingKodeAtoZ={getAllProductSortingKodeAtoZ}
            sortingKodeZtoA={getAllProductSortingKodeZtoA}
            sortingAtoZ={getAllProductSortingNameAtoZ}
            sortingZtoA={getAllProductSortingNameZtoA}
            sortingKategoriAtoZ={getAllProductSortingKategoriAtoZ}
            sortingKategoriZtoA={getAllProductSortingKategoriZtoA}
            sortingLowestPrice={getAllProductSortingLowestPrice}
            sortingHighestPrice={getAllProductSortingHighestPrice}
          />  
        )}
      </div>
    </>
  );
};
export default Product;
