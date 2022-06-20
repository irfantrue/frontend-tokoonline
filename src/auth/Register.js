import Layout from "../components/layouts/Layout";
import MainTextInput from "../components/forms/MainTextInput";
import MainButton from "../components/buttons/MainButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import MainTextArea from "../components/forms/MainTextArea";
import { Link, useHistory } from "react-router-dom";
import apiClient from "../components/services/ApiClient";
import { toast } from "react-hot-toast";
import { useState } from "react";
import TextField from '@mui/material/TextField';

const Register = () => {
  const history = useHistory();

  const [registerData, setRegisterData] = useState({
    namaLengkap: "",
    email: "",
    phone: "",
    password: "",
    alamat: "",
  });

  const handleRegister = () => {
    apiClient()
      .post("/signup", {
        fullname: registerData.namaLengkap,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        address: registerData.alamat,
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
            return false;
          }
        }

        if (response.data.status === 409) {
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
          return false;
        }

        toast.success("Berhasil! silakan login", {
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
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Terjadi kesalahan pada server", {
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
      });
  };

  return (
    <Layout header={false} footer={true}>
      <div className={"grid grid-cols-3 gap-2"}>
        <div className={"col-span-2"}>
          <img
            className={"w-full object-cover"}
            style={{height: "600px", marginTop: "100px"}}
            src={process.env.PUBLIC_URL + "/banners/banner-login.png"}
            alt={"Banner"}
          />          
        </div>
        <div className={"col-span-1 mt-24"}>
          <div className={"my-12 grid grid-flow-row-dense grid-cols-3"}>
            <div className={"col-span-1"}>
              <Link
                to={"/"}
              >
                <h1 
                  className={"text-center font-medium text-2xl"} 
                  style={{color: "#AF6F33"}}
                >
                  Wendys Cake
                </h1>
              </Link>
            </div>
            <div>
              <h1 className={"text-center font-medium text-2xl"}>Register</h1>
            </div>
          </div>
          <div className={"grid grid-cols-1 gap-2"}>
            <div className={"grid grid-cols-2 gap-2"}>
              <MainTextInput
                onChange={(e) => {
                  setRegisterData({ ...registerData, namaLengkap: e.target.value });
                }}
                placeholder={"Input nama lengkap kamu disini"}
                label={"Nama Lengkap"}
              />
              {/* <TextField
                onChange={(e) => {
                  setRegisterData({ ...registerData, namaLengkap: e.target.value });
                }}
                id={"standard-basic"} 
                label={"Nama Lengkap"}
                variant={"standard" }
                placeholder={"Input nama lengkap kamu disini"}
                className={"flex-1 w-full"}
              /> */}
              <MainTextInput
                onChange={(e) => {
                  setRegisterData({ ...registerData, email: e.target.value });
                }}
                placeholder={"Input email kamu disni"}
                label={"Email"}
              />
              {/* <TextField
                onChange={(e) => {
                  setRegisterData({ ...registerData, email: e.target.value });
                }}
                id={"standard-basic"} 
                label={"Email Address"}
                variant={"standard" }
                placeholder={"Input email kamu disini"}
                className={"flex-1 w-full"}
              /> */}
            </div>
            <div className={"grid grid-cols-2 gap-2"}>
              <MainTextInput
                onChange={(e) => {
                  setRegisterData({ ...registerData, phone: e.target.value });
                }}
                placeholder={"08xxxxxxxx"}
                label={"Phone"}
              />
              {/* <TextField
                onChange={(e) => {
                  setRegisterData({ ...registerData, phone: e.target.value });
                }}
                id={"standard-basic"} 
                label={"Phone"}
                variant={"standard" }
                placeholder={"08xxxxxxxx"}
                className={"flex-1 w-full"}
              /> */}
              <MainTextInput
                onChange={(e) => {
                  setRegisterData({ ...registerData, password: e.target.value });
                }}
                type={"password"}
                placeholder={"Input password kamu disini"}
                label={"Password"}
              />
              {/* <TextField
                onChange={(e) => {
                  setRegisterData({ ...registerData, password: e.target.value });
                }}
                id={"standard-basic"} 
                type={"password"}
                placeholder={"Input password kamu disini"}
                label={"Password"}
                variant={"standard"}
                className={"flex-1 w-full"}
              /> */}
            </div>
          </div>
          {/* <div className={"grid grid-cols-2 gap-2"}> */}
            <MainTextArea
              onChange={(e) => {
                setRegisterData({ ...registerData, alamat: e.target.value });
              }}
              placeholder={"Input alamat kamu disni"}
              label={"Alamat"}
            />
            {/* <TextField
              onChange={(e) => {
                setRegisterData({ ...registerData, alamat: e.target.value });
              }}            
              id={"standard-textarea"}
              label={"Alamat"}
              placeholder={"Input alamat kamu disni"}
              multiline
              variant={"standard"}
              className={"flex-1 w-full"}
            /> */}
          {/* </div> */}
          <div className={"mt-8"}>
            <div className={"mb-2"}>
              <MainButton
                onClick={() => {
                  handleRegister();
                }}
                className={"w-full"}
                label={"Register sekarang"}
              />
            </div>
            <div className={"my-2"}>
              <SecondaryButton
                onClick={() => {
                  history.push("/login");
                }}
                className={"w-full"}
                label={"Kembali ke login"}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Register;
