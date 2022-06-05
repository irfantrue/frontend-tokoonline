import CurrencyFormat from "react-currency-format";

const SimplePricing = ({ value }) => {
  return (
    <>
      <CurrencyFormat
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rp "}
        value={value}
      />
    </>
  );
};
export default SimplePricing;
