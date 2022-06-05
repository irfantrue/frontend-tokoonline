import CurrencyFormat from "react-currency-format";
import MainTextInput from "./MainTextInput";

const MainPriceInput = (props) => {
  return (
    <>
      <div className="my-2">
        {props.label ? <label>{props.label}</label> : null}
        <CurrencyFormat
          thousandSeparator={true}
          prefix={"Rp"}
          customInput={MainTextInput}
          name={props.name}
          value={props.value}
          type={props.type}
          onChange={props.onChange}
          autoComplete={"off"}
          placeholder={props.placeholder}
        />
        {props.errorMsg ? (
          <p className={"text-red-500 text-xs"}>{props.errorMsg}</p>
        ) : null}
      </div>
    </>
  );
};
export default MainPriceInput;
