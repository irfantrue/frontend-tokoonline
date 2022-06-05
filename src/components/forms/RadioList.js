import MainRadioButton from "./MainRadioButton";

const RadioList = ({ radios }) => {
  const getAllRadio = () => {
    return radios.map((radio, key) => <MainRadioButton />);
  };
  return <>{getAllRadio()}</>;
};
export default RadioList;
