import { Link } from "react-router-dom";
const Breadcumb = (props) => {
  return (
    <div className="flex gap-2">
      <Link to={"/"} className={"cursor-pointer my-auto"}>
        <i className="fa-solid fa-arrow-left" />
      </Link>
      {props.labels.map((item, i) => (
        <div>
          <Link
            to={item.link}
            className={`text-sm cursor-pointer ${
              props.labels.length - 1 !== i ? "text-gray-500" : "text-blue-500"
            }`}
          >
            {item.label}
          </Link>
          {props.labels.length - 1 !== i ? (
            <span className="text-sm text-gray-500"> > </span>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};
export default Breadcumb;
