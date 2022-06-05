const DangerBadge = (props) => {
  return (
    <span
      className={`text-sm py-1 px-2 bg-red-50 text-red-500 rounded-lg border border-red-600 mr-2 ${props.className}`}
    >
      {props.children}
    </span>
  );
};
export default DangerBadge;
