import { motion } from "framer-motion";

const RoundedBadge = (props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      onClick={props.onClick}
      className={`${
        props.selected
          ? "bg-green-600 text-white"
          : "bg-green-50 text-green-600"
      } text-sm py-2 px-4 font-medium rounded-full border border-green-600 mr-2 cursor-pointer hover:bg-green-600 hover:text-white duration-300 ${
        props.className
      }`}
    >
      {props.children}
    </motion.button>
  );
};
export default RoundedBadge;
