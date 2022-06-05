const TextWithIcon = (props) => {
  return (
    <>
      <div className={`flex gap-2 ${props.mainClass}`}>
        <div>
          <img
            className={`w-12 h-12 object-cover ${props.imageClass}`}
            src={props.icon}
            alt="Icon"
          />
        </div>
        <div className="my-auto">
          <span className={`font-normal text-base ${props.textClass}`}>
            {props.label}
          </span>
        </div>
      </div>
    </>
  );
};
export default TextWithIcon;
