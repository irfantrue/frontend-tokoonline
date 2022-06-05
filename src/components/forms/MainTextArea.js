const MainTextArea = (props) => {
  return (
    <>
      <div className="my-2">
        {props.label ? <label>{props.label}</label> : null}
        <textarea
          defaultValue={props.value}
          type={props.type}
          onChange={props.onChange}
          id={props.id}
          className={`rounded-lg flex-1 appearance-none border border-gray-300 w-full mt-1 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`}
          name={props.name}
          autoComplete={"off"}
          placeholder={props.placeholder}
        />
        <div className={"flex justify-between"}>
          <div>
            {props.errorMsg ? (
              <span className={"text-red-500 text-xs"}>{props.errorMsg}</span>
            ) : null}
          </div>
          <div>
            {props.maxCharacter ? (
              <span className={"text-xs"}>
                {props.totalCharacter}/{props.maxCharacter}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default MainTextArea;
