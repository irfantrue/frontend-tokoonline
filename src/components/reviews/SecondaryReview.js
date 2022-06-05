const SecondaryReview = (props) => {
  return (
    <>
      <span className="text-sm text-gray-500 font-base">
        <i className="fa-solid fa-star text-yellow-400" /> {props.children}
      </span>
    </>
  );
};
export default SecondaryReview;
