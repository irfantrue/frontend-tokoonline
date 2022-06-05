import Layout from "../components/layouts/Layout";
import MainTextInput from "../components/forms/MainTextInput";
import MainButton from "../components/buttons/MainButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { Link, useHistory } from "react-router-dom";
import apiClient from "../components/services/ApiClient";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const history = useHistory();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    apiClient()
      .post("/login", {
        email: loginData.email,
        password: loginData.password,
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
          return false;
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
          return false;
        }

        else if (response.data.status === 401) {
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

        localStorage.setItem("token", response.data.data.accessToken);

        history.push("/");
      })
      .catch((err) => {
        toast.error("Terjadi kesalahan pada server", {
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
    <Layout footer={true} header={false}>
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
              <h1 className={"font-medium text-2xl text-center"}>Login</h1>
            </div>
          </div>
          <MainTextInput
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
            placeholder={"Input email kamu disini"}
            label={"Email Address"}
          />
          <MainTextInput
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
            type={"password"}
            placeholder={"Input password kamu disini"}
            label={"Password"}
          />
          <div className={"mt-8"}>
            <MainButton
              onClick={() => {
                handleLogin();
              }}
              className={"w-full"}
              label={"Login ke akunku"}
            />
          </div>
          <div className={"mb-2"}>
            <SecondaryButton
              onClick={() => {
                history.push("/register");
              }}
              className={"w-full"}
              label={"Buat Akun"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Login;
