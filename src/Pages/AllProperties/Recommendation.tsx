import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const Recommendation = (props: { item: string }) => {
  const { setSearchText, setShowText } = useContext(AuthContext);
  return (
    <div>
      <motion.p
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        onClick={() => {
          setSearchText(props.item);
          setShowText(false);
        }}
        className=" cursor-pointer p-2 text-lg w-full hover:bg-gray-400"
      >
        {props.item}
      </motion.p>
    </div>
  );
};

export default Recommendation;
