import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import IsAuth from "./services/IsAuth";
import Dropdown from "./Dropdown";
import apiClient from "./services/ApiClient";
import SimplePricing from "./pricings/SimplePricing";
import InfoModal from "./modals/InfoModal";
import MainModal from "./modals/MainModal";
import MainTextInput from "./forms/MainTextInput";
import MainTextArea from "./forms/MainTextArea";
import toast from "react-hot-toast";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [identity, setIdentity] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    if (IsAuth() && !identity.name) {
      getIdentity();
    }
  }, []);

  const path = window.location.pathname;
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  const getIdentity = () => {
    apiClient()
      .get("/identitas-navbar")
      .then((response) => {
        setIdentity({
          ...identity,
          name: response.data.data.fullname,
          role: response.data.data.role,
        });

        localStorage.setItem("role", response.data.data.role);
      });
  };

  const detailProfile = useCallback((id) => {
    apiClient()
      .get("/profile/")
      .then((response) => {
        setSelectedProfile(response.data.data);
        setShowProfile(true);
      })
  }, []);

  const editProfileUser = () => {
    apiClient()
      .put("/profile", {
        fullname: selectedProfile.fullname,
        email: selectedProfile.email,
        phone: selectedProfile.phone,
        address: selectedProfile.address
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
          detailProfile();
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
          detailProfile();
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
          setShowProfile(false);
          detailProfile();
        }
      })
  }

  const handleSaveModal = () => {
    editProfileUser();
  }

  return (
    <>

      <MainModal
        handleClose={() => {
          setShowProfile(false);
        }}
        onClick={() => {
          handleSaveModal();
        }}
        showModal={showProfile}
        buttonLabel={"Simpan"}
        title={"Profile"}
      >
        <MainTextInput
          label={"Nama"}
          placeholder={selectedProfile.fullname}
          value={selectedProfile.fullname}
          onChange={(e) => {
            setSelectedProfile({
              ...selectedProfile, 
              fullname: e.target.value
            });
          }}
        />

        <MainTextInput
          label={"Email"}
          placeholder={selectedProfile.email}
          value={selectedProfile.email}
          onChange={(e) => {
            setSelectedProfile({
              ...selectedProfile,
              email: e.target.value
            });
          }}
        />

        <MainTextInput
          label={"Phone"}
          placeholder={selectedProfile.phone}
          value={selectedProfile.phone}
          onChange={(e) => {
            setSelectedProfile({
              ...selectedProfile,
              phone: e.target.value
            });
          }}
        />

        <MainTextArea
          label={"Address"}
          placeholder={selectedProfile.address}
          value={selectedProfile.address}
          onChange={(e) => {
            setSelectedProfile({
              ...selectedProfile,
              address: e.target.value
            })
          }}
        />
      </MainModal>

      <nav className="border-gray-100 py-6 border-b-2 md:space-x-10">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to={"/"} className="flex items-center">
            <h1 
              className={"text-center font-medium text-2xl"} 
              style={{color: "#AF6F33"}}
            >
              Wendys Cake
            </h1>
          </Link>
          <div className="flex items-center md:order-2">
            {IsAuth() ? (
              <button
                onClick={() => {
                  setDropdown(!dropdown);
                }}
                className="md:block flex mr-3 text-sm rounded-full md:mr-0"
              >
                <i className="p-3 fa-solid fa-user"></i>
                <span>{identity.name}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  window.location.href = "/login";
                }}
                className="md:block flex mr-3 text-sm rounded-full md:mr-0"
              >
                <span>Login</span>
              </button>
            )}
            <Dropdown
              dropdown={dropdown}
              className={
                "group-hover:block top-12 2xl:right-48 md:right-20 list-none bg-white w-36 rounded shadow duration-500 transition"
              }
            >
              {identity.role !== "User" ? (
                <li>
                  <Link
                    to={"/admin"}
                    className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : null}
              <li
                onClick={() => {
                  detailProfile()
                }}
              >
                <span className="block py-2 px-4 text-sm text-black hover:bg-gray-100">
                  Profile
                </span>                
              </li>
              <li
                onClick={() => {
                  handleLogout();
                }}
              >
                <span className="block py-2 px-4 text-sm text-black hover:bg-gray-100">
                  Log out
                </span>
              </li>
            </Dropdown>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  to={"/"}
                  className={`block py-2 pr-4 pl-3 rounded text-gray-600 md:bg-transparent md:p-0 md:font-medium ${
                    path === "/" ? "text-green-600" : null
                  }`}
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to={"/cart"}
                  className={`block py-2 pr-4 pl-3 rounded text-gray-600 md:bg-transparent md:p-0 md:font-medium ${
                    path === "/cart" ? "text-green-600" : null
                  }`}
                >
                  Keranjang
                </Link>
              </li>
              <li>
                <Link
                  to={"/transaksi"}
                  className={`block py-2 pr-4 pl-3 rounded text-gray-600 md:bg-transparent md:p-0 md:font-medium ${
                    path === "/transaksi" ? "text-green-600" : null
                  }`}
                >
                  Transaksi
                </Link>
              </li>
              <li>
                <Link
                  to={"/pembayaran"}
                  className={`block py-2 pr-4 pl-3 rounded text-gray-600 md:bg-transparent md:p-0 md:font-medium ${
                    path === "/pembayaran" ? "text-green-600" : null
                  }`}
                >
                  Pembayaran
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
