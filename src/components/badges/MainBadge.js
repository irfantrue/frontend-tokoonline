const MainBadge = (props) => {
  return (
    <span
      className={`text-sm py-2 px-4 bg-green-50 font-medium text-green-600 rounded-lg border border-green-600 mr-2 ${props.className}`}
    >
      {props.children}
    </span>
  );
};
export default MainBadge;
