import DangerBadge from "../badges/DangerBadge";

const MainPricing = (props) => {
  return (
    <>
      {props.promoPrice ? (
        <div>
          <div className={"text-gray-500"}>
            <span className={"text-xl line-through"}>{props.actualPrice}</span>
            <span className={"text-xs"}>/project</span>
          </div>
          <div className={"text-gray-500 my-4"}>
            <DangerBadge>Promo 25%</DangerBadge>
            <span className={"text-red-600 font-semibold text-2xl"}>
              {props.promoPrice}
            </span>
            <span className={"text-xs"}>/project</span>
          </div>
        </div>
      ) : (
        <div className={"text-gray-500 mb-2"}>
          <span className={"text-red-600 font-semibold text-2xl"}>
            {props.actualPrice}
          </span>
          <span className={"text-xs"}>/project</span>
        </div>
      )}
    </>
  );
};
export default MainPricing;
