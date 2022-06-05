import { Route } from "react-router-dom";
import Home from "../user/home/Home";
import Cart from "../user/home/Cart";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Transaksi from "../user/home/Transaksi";
import Dashboard from "../admin/Dashboard";
import DetailProduct from "../user/home/DetailProduct";
import IsAuth from "../components/services/IsAuth";
import IsAdmin from "../components/services/IsAdmin";
import Products from "../user/home/Products";
import Pembayaran from "../user/home/Pembayaran";

const Router = () => {
  return (
    <>
      <Route path={"/"} component={Home} exact />
      <Route
        path={"/login"}
        component={() => {
          if (IsAuth()) {
            window.location.href = "/";
            return false;
          }
          return <Login />;
        }}
        exact
      />
      <Route
        path={"/register"}
        component={() => {
          if (IsAuth()) {
            window.location.href = "/";
            return false;
          }
          return <Register />;
        }}
        exact
      />
      <Route
        path={"/cart"}
        component={() => {
          if (IsAuth()) {
            return <Cart />;
          }
          window.location.href = "/login";
        }}
        exact
      />
      <Route
        path={"/transaksi"}
        component={() => {
          if (IsAuth()) {
            return <Transaksi />;
          }
          window.location.href = "/login";
        }}
        exact
      />
      <Route
        path={"/pembayaran"}
        component={() => {
          if (IsAuth()) {
            return <Pembayaran />;
          }
          window.location.href = "/login";
        }}
        exact
      />
      <Route path={"/products"} component={Products} exact />
      <Route path={"/product/:slug"} component={DetailProduct} exact />
      <Route
        path={"/admin"}
        component={() => {
          window.location.href = "/admin/product";
        }}
        exact
      />
      <Route
        path={"/admin/:slug"}
        component={() => {
          if (IsAuth() && IsAdmin()) {
            return <Dashboard />;
          }
          window.location.href = "/login";
        }}
        exact
      />
    </>
  );
};
export default Router;
