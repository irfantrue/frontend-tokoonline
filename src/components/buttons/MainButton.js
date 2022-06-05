import { motion } from "framer-motion";
const MainButton = (props) => {
  return (
    <>
      <motion.button
        type={props.type}
        onClick={props.onClick}
        whileHover={{ scale: 1.01 }}
        disabled={props.disabled}
        className={`p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 duration-200 ${props.className}`}
      >
        {props.label}
      </motion.button>
    </>
  );
};
export default MainButton;
