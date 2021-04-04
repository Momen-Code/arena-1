import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Style
import "./style.scss";

const Logo = () => {
  const letterVariants = {
    initial: {
      y: "-150px",
      opacity: 0,
    },
    in: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: (i + 1) * 0.1,
      },
    }),
    out: (i) => ({
      y: "-150px",
      opacity: 0,
      transition: {
        delay: (i + 1) * 0.1,
      },
    }),
  };

  return (
    <Link to="/" className="logo-container">
      {["A", "R", "E", "N", "A"].map((letter, i) => (
        <motion.span
          initial="initial"
          animate="in"
          exit="out"
          variants={letterVariants}
          custom={i}
          transition={{
            repeat: Infinity,
            delay: 2,
            y: { type: "spring", stiffness: 200 },
          }}
        >
          {letter}
        </motion.span>
      ))}
      <div className=""></div>
    </Link>
  );
};

export default Logo;
