import { motion } from "framer-motion";

const VerticalText = ({ children, ...rest }) => {
  const lineVariants = {
    initial: {
      x: "-50px",
      opacity: 0,
    },
    in: {
      x: 0,
      opacity: 1,
    },
    out: {
      x: 0,
      opacity: 0,
    },
  };

  const letterVariants = {
    initial: {},
    in: {
      x: 0,
      y: 0,
    },
    out: {
      x: Math.ceil(Math.random() * 1800),
      y: Math.ceil(Math.random() * 1800),
      rotate: Math.ceil(Math.random() * 360),
    },
  };
  return (
    <motion.div
      className="vertical-text"
      initial="initial"
      animate="in"
      exit="out"
      variants={lineVariants}
      transition={{ duration: 0.7 }}
      {...rest}
    >
      {children.split("").map((letter, i) => (
        <motion.span
          initial="initial"
          animate="in"
          exit="out"
          custom={i}
          variants={letterVariants}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default VerticalText;
