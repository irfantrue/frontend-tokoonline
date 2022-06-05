import { motion } from "framer-motion";
const SecondaryButton = (props) => {
  return (
    <>
      <motion.button
        type={props.type}
        onClick={props.onClick}
        whileHover={{ scale: 1.01 }}
        disabled={props.disabled}
        className={`${props.className} my-2 font-medium text-base text-green-500 bg-green-50 duration-500 cursor-pointer hover:bg-green-100 py-2 px-4 rounded-lg`}
      >
        {props.label}
      </motion.button>
    </>
  );
};
export default SecondaryButton;
