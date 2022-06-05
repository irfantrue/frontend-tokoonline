import SimplePricing from "../pricings/SimplePricing";
import MainButton from "../buttons/MainButton";
import MainTextInput from "../forms/MainTextInput";
import { useState } from "react";
import apiClient from "../services/ApiClient";

const CartTableData = ({
  product,
  deleteCartCallback,
  setTotal,
  loadPrentClassCallback,
}) => {
  const [productQuantity, setProductQuantity] = useState(product.jumlah);

  const handleAddQuantity = () => {
    setProductQuantity(productQuantity + 1);

    apiClient()
      .put("/cart/tambah-jumlah/" + product.id)
      .then((response) => {
        loadPrentClassCallback();
      });
  };

  const handleDecQuantity = () => {
    if (productQuantity <= 1) {
      return false;
    }
    setProductQuantity(productQuantity - 1);

    apiClient()
      .put("/cart/kurang-jumlah/" + product.id)
      .then((response) => {
        loadPrentClassCallback();
      });
  };

  const productSubtotal = () => {
    return product.harga * productQuantity;
  };

  setTotal(productSubtotal());

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10"
              src={
                process.env.REACT_APP_BACKEND_URL + "/images/" + product.image
              }
              alt={product.nama_produk}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.nama_produk}
            </div>
            <div className="text-sm text-gray-500">{product.desc}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <SimplePricing value={product.harga} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap w-48">
        <div className={"grid grid-cols-3 gap-2"}>
          <MainButton
            onClick={() => {
              handleDecQuantity(product.slug);
            }}
            className={"h-10 my-auto"}
            label={"-"}
          />
          <MainTextInput
            readOnly={true}
            value={productQuantity}
            placeholder={1}
          />
          <MainButton
            onClick={() => {
              handleAddQuantity(product.slug);
            }}
            className={"h-10 my-auto"}
            label={"+"}
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          <SimplePricing value={productSubtotal()} />
        </div>
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex bg-yellow-100 text-yellow-800 text-xs leading-5 font-semibold rounded-full`}
        >
          status
        </span>
      </td> */}

      <td
        className="px-6 py-4 whitespace-nowrap"
        onClick={() => {
          deleteCartCallback(product.slug);
        }}
      >
        <p className="text-red-600 hover:text-red-900 cursor-pointer">
          <i className="fa-solid fa-trash"></i>
        </p>
      </td>
    </tr>
  );
};
export default CartTableData;
