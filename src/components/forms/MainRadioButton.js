const MainRadioButton = (props) => {
  return (
    <div>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-6 h-6"
            onChange={props.onChange}
            name={props.name}
            value={props.value}
            checked={props.checked}
          />
          <span className="ml-2">{props.label}</span>
        </label>
      </div>
    </div>
  );
};
export default MainRadioButton;
