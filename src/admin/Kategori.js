import CategoryTable from "../components/categories/CategoryTable";
import MainButton from "../components/buttons/MainButton";
import MainModal from "../components/modals/MainModal";
import MainTextInput from "../components/forms/MainTextInput";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../components/services/ApiClient";
import { toast } from "react-hot-toast";

const Kategori = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedIdCategory, setSelectedIdCategory] = useState(0);
  const [editCategoryText, setEditCategoryText] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCategories();
    // getAllKategoriSortingNameAtoZ();
    // getAllKategoriSortingNameZtoA();
    // getAllKategoriSortingIdTerendah();
    // getAllKategoriSortingIdTertinggi();
  }, []);

  const getAllCategories = () => {
    apiClient()
      .get("/kategori")
      .then((response) => {
        setCategories(response.data.data);
      });
  };

  const getAllKategoriSortingNameAtoZ = () => {
    apiClient()
      .get("/sorting-admin-kategori-a-to-z")
      .then((response) => {
        setCategories(response.data.data);
      })
  };

  const getAllKategoriSortingNameZtoA = () => {
    apiClient()
      .get("/sorting-admin-kategori-z-to-a")
      .then((response) => {
        setCategories(response.data.data);
      })
  };

  const getAllKategoriSortingIdTerendah = () => {
    apiClient()
      .get("/sorting-admin-idkategori-terendah")
      .then((response) => {
        setCategories(response.data.data);
      })
  };

  const getAllKategoriSortingIdTertinggi = () => {
    apiClient()
      .get("/sorting-admin-idkategori-tertinggi")
      .then((response) => {
        setCategories(response.data.data);
      })
  };

  const callbackEditModal = useCallback(
    (id) => {
      const selectedCategory = categories.filter(
        (category) => category.id === id
      )[0];

      setSelectedIdCategory(id);
      setEditCategoryText(selectedCategory.nama_kategori);

      setShowEditCategory(true);
    },
    [categories]
  );

  const callbackDelete = useCallback((id) => {
    deleteCategory(id);
  }, []);

  const editCategory = () => {
    apiClient()
      .put("/kategori/" + selectedIdCategory, {
        nama_kategori: editCategoryText,
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
          setShowAddCategory(false);
          getAllCategories();
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
            getAllCategories();  
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
          getAllCategories();
        }

        else {
          toast.error(response.data.msg);
          getAllCategories();
        }
      });
  };

  const deleteCategory = (id) => {
    apiClient()
      .delete("/kategori/" + id)
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
          getAllCategories();
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
          getAllCategories();
        }

      });
  };

  const addCategory = () => {
    apiClient()
      .post("kategori", {
        nama_kategori: editCategoryText,
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
          });
          setShowAddCategory(false);
          getAllCategories();
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
            getAllCategories();  
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
          getAllCategories();
        }

        else {
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
          getAllCategories();
        }
      });
  };

  const filteredNamaKategori = categories.filter((categorie) => {
    return categorie.nama_kategori.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <>
      <MainModal
        handleClose={() => {
          showAddCategory
            ? setShowAddCategory(false)
            : setShowEditCategory(false);
        }}
        onClick={() => {
          showAddCategory ? addCategory() : editCategory();
        }}
        showModal={showAddCategory || showEditCategory}
        buttonLabel={"Simpan"}
        title={showAddCategory ? "Tambah Kategori" : "Edit Kategori"}
      >
        <MainTextInput
          label={"Nama Kategori"}
          value={editCategoryText}
          onChange={(e) => {
            setEditCategoryText(e.target.value);
          }}
        />
      </MainModal>
      <div className={"flex justify-between"}>
        <div>
            <MainTextInput
              className={"w-96"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder={"Cari kategori"}
            />
        </div>
        <div>
          <MainButton
            onClick={() => {
              setShowAddCategory(true);
            }}
            label={"Tambah Kategori"}
          />
        </div>
      </div>

      <div>
        {categories.length === 0 ? (
          <CategoryTable
            categories={categories}
            callbackEditModal={callbackEditModal}
            callbackDelete={callbackDelete}
            sortingAtoZ={getAllKategoriSortingNameAtoZ}
            sortingZtoA={getAllKategoriSortingNameZtoA}
            sortingIdTerendah={getAllKategoriSortingIdTerendah}
            sortingIdTertinggi={getAllKategoriSortingIdTertinggi}
          />
        ) : (
          <CategoryTable
            categories={filteredNamaKategori}
            callbackEditModal={callbackEditModal}
            callbackDelete={callbackDelete}
            sortingAtoZ={getAllKategoriSortingNameAtoZ}
            sortingZtoA={getAllKategoriSortingNameZtoA}
            sortingIdTerendah={getAllKategoriSortingIdTerendah}
            sortingIdTertinggi={getAllKategoriSortingIdTertinggi}
          />
        )}
      </div>
    </>
  );
};
export default Kategori;
