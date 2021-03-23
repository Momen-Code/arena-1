import { useEffect } from "react";
import { motion, useViewportScroll } from "framer-motion";
import { useHistory } from "react-router-dom";

//Components
import { Header } from "../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../assets/img/circle-shape-primary.png";

const Home = () => {
  const history = useHistory();
  const { scrollYProgress } = useViewportScroll();

  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   setTimeout(() => {
  //     window.addEventListener("scroll", handleScroll);
  //   }, 2000);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = (e) => {
  //   const yPos = window.scrollY;
  //   const isScrollUp = yPos < 20;

  //   if (isScrollUp) {
  //     // history.push("/who-we-are", { prevPath: "/" });
  //   } else {
  //     history.push("/who-we-are", { prevPath: "/" });
  //   }
  // };

  const pageVariants = {
    initial: {},
    in: {
      y: 0,
    },
    out: {},
  };

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
      x: "100%",
      opacity: 0,
    },
  };

  const lineTransitions = {
    duration: 0.7,
  };

  return (
    <motion.div
      className="home-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 2 }}
    >
      <Header />
      <div className="left-wrapper">
        <motion.div className="info-text">
          <div>
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={lineVariants}
              transition={lineTransitions}
            >
              Cynicism is something that is part of the media
            </motion.div>
          </div>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={lineVariants}
            transition={lineTransitions}
          >
            production of a certain type of subjectivity or
          </motion.div>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={lineVariants}
            transition={lineTransitions}
          >
            consciousness that is passive and
            <span>disempowered</span>,
          </motion.div>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={lineVariants}
            transition={lineTransitions}
          >
            cynical, fatalistic, pessimistic
          </motion.div>
        </motion.div>
      </div>
      <div className="right-wrapper">
        <img className="circle-img" src={CircleShape} alt="" />
      </div>
    </motion.div>
  );
};

export default Home;
