const Dropdown = (props) => {
  return (
    <>
      <div
        className={`${
          props.dropdown ? "md:block" : ""
        } hidden absolute z-50 my-4 text-base font-semibold ${props.className}`}
      >
        <ul className="py-1">{props.children}</ul>
      </div>
    </>
  );
};
export default Dropdown;
