import Header from "../Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <>
      {props.header ? <Header /> : null}
      <Toaster position="top-center" reverseOrder={false} />
      <div className={`${props.className} md:mt-12 mt-4 mx-12`}>
        {props.children}
      </div>
      {props.footer ? <Footer /> : null}
    </>
  );
};
export default Layout;
