const ProgressBar = ({ value }) => {
  return (
    <>
      <div className={"flex gap-2"}>
        <div
          style={{ width: value + "%" }}
          className={`progress-bar h-2 bg-green-500 border-gray-100 rounded-full my-auto`}
        />
        <div className={"my-auto"}>
          <p className={"text-xs"}>{value}%</p>
        </div>
      </div>
    </>
  );
};
export default ProgressBar;
