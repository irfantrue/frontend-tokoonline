import MainProduct from "./MainProduct";

const MainProductList = ({ products }) => {
  const getAllProducts = () => {
    return products.map((product, key) => (
      <MainProduct product={product} key={key} />
    ));
  };

  return (
    <>
      <div className={"grid grid-cols-5 gap-2"}>{getAllProducts()}</div>
    </>
  );
};
export default MainProductList;
