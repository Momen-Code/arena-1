import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

//Style
import "./style.scss";

//Components
import GetQuotePaper from "./components/GetQuotePaper/GetQuotePaper";
import Logo from "./components/Logo/Logo";

const Header = ({ getquote = true, menuOpen = false }) => {
  const { state: locationState, pathname } = useLocation();
  const [quoteActive, setQuoteActive] = useState(false);

  useEffect(() => {
    console.log(locationState);
  }, []);

  const quoteVariants = menuOpen
    ? {
        initial: {
          x: 120,
          transition: "none",
        },
        in: { x: 120 },
        out: {
          x: 120,
        },
      }
    : {
        initial: {
          x: 120,
        },
        in: { x: 0 },
        out: { x: 150, transition: "none" },
      };

  const quoteTransition = menuOpen
    ? {}
    : { duration: 0.5, x: { type: "spring", stiffness: 200 } };

  const burgerMenuVariants = menuOpen
    ? {
        initial: {
          y: 0,
          x: "120vw",
          transition: "none",
        },
        in: {
          y: 0,
          x: 0,
        },
        out: {
          transition: "none",
          y: "-150vh",
          x: "150vw",
        },
      }
    : {
        initial: {
          transition: "none",

          opacity: 0,
          translateX: 100,
          translateY: 0,
        },
        in: {
          opacity: 1,
          translateX: 0,
          translateY: 0,
        },
        out: {
          transition: "none",
          translateX: 100,
          opacity: 0,
        },
      };

  const burgerSpanVariants = menuOpen
    ? {
        initial: (i) => ({
          rotate: i * 90,
          translateX: i * -150,
          translateY: i * -150,
          width: "calc(100% + 16px)",
        }),
        in: (i) => ({
          rotate: i == 1 ? 0 : i == 2 ? -75 : i == 3 ? -75 : 0,
          translateX: i == 1 ? 0 : i == 2 ? -14 : i == 3 ? 14 : -2,
          translateY: i == 1 ? 0 : i == 2 ? 2 : i == 3 ? -8 : -8,
          width: "calc(100% + 16px)",
          scale: 1.1,
        }),
        out: (i) => ({
          rotate: i * 90,
          translateX: i * -150,
          translateY: i * -150,
          width: "calc(100% + 16px)",
        }),
      }
    : {
        initial: (i) => ({
          right: i * -50,
        }),
        in: {
          right: 0,
        },
        out: (i) => ({
          rotate: i * 90,
          translateX: i * 150,
          translateY: i * -150,
        }),
      };

  return (
    <div className="header-container">
      <Logo />
      <Link
        to={
          pathname != "/menu"
            ? { pathname: "/menu", state: { prevPath: pathname } }
            : {
                pathname: (locationState && locationState.prevState) || "/",
                state: { prevPath: pathname },
              }
        }
      >
        <motion.div
          className={`burger-menu ${menuOpen ? "open" : ""}`}
          initial="initial"
          animate="in"
          exit="out"
          variants={burgerMenuVariants}
          transition={menuOpen ? { duration: 2 } : { duration: 2 }}
        >
          {[1, 2, 3, 4].map((item, i) => (
            <motion.span
              key={i}
              custom={i + 1}
              initial="initial"
              animate="in"
              exit="out"
              variants={burgerSpanVariants}
              transition={{ type: "spring", stiffness: 200 }}
            ></motion.span>
          ))}
        </motion.div>
      </Link>
      <motion.div
        className={`get-quote-container ${quoteActive ? " active" : ""}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={quoteVariants}
        transition={quoteTransition}
      >
        <div
          className={`get-quote-btn ${quoteActive ? " active" : ""}`}
          onClick={() => setQuoteActive(!quoteActive)}
        >
          Get a Quote
        </div>
        <div className={`get-quote-wrapper ${quoteActive ? " active" : ""}`}>
          <GetQuotePaper />
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
