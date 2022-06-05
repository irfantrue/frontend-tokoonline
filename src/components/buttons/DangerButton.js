import { motion } from "framer-motion";

const DangerButton = (props) => {
  return (
    <>
      <motion.button
        type={props.type}
        onClick={props.onClick}
        whileHover={{ scale: 1.05 }}
        disabled={props.disabled}
        className={`p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 duration-200 ${props.className}`}
      >
        {props.label}
      </motion.button>
    </>
  );
};
export default DangerButton;
