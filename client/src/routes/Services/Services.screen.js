import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

//Components
import { Header, Footer } from "../../components";

//Style
import "./style.scss";

const Portfolio = () => {
  const history = useHistory();
  const { pathname, state } = useLocation();

  const [lastYPos, setLastYPos] = useState(0);

  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;

  //   setTimeout(() => {
  //     window.addEventListener("scroll", handleScroll);
  //   }, 2000);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastYPos]);

  // const handleScroll = (e) => {
  //   const yPos = window.scrollY;
  //   const isScrollUp = yPos < 20;

  //   if (isScrollUp) {
  //     history.push("/who-we-are", { prevPath: "/our-services" });
  //   } else {
  //     history.push("/our-services", { prevPath: "/our-services" });
  //   }
  // };

  const pageVariants =
    state && state.prevPath == "/who-we-are"
      ? {
          initial: {
            y: "100vh",
          },
          in: {
            y: 0,
          },
          out: {},
        }
      : {
          initial: {},
          in: {
            opacity: 1,
          },
          out: {
            opacity: 0,
          },
        };

  const letterVariants = {
    initial: (i) => ({
      x: i * -150,
      opacity: 0,
    }),
    in: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: (i + 1) * 0.2,
      },
    }),
    out: (i) => ({
      x: -150,
      opacity: 0,
      transition: {
        delay: (i + 1) * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className="services-container"
      initial="initial"
      animate="in"
      exit=""
      variants={pageVariants}
      transition={{ duration: 2 }}
    >
      <Header />
      <div className="page-container">
        <div className="left-wrapper">
          <div className="our-services-txt">
            {["O", "U", "R"].map((letter, i) => (
              <motion.span
                initial="initial"
                animate="in"
                exit="out"
                variants={letterVariants}
                custom={i}
                transition={{
                  duration: 2,
                }}
              >
                {letter}
              </motion.span>
            ))}
            <br />
            {["S", "E", "R", "V", "I", "C", "E", "S"].map((letter, i) => (
              <motion.span
                initial="initial"
                animate="in"
                exit="out"
                variants={letterVariants}
                custom={i}
                transition={{
                  duration: 2,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="right-wrapper">
          <div className="services-grid">
            <div className="service-box">
              <h1 className="title">Printing</h1>
            </div>
            <div className="service-box">
              <h1 className="title">Marketing</h1>
            </div>
            <div className="service-box">
              <h1 className="title">Interior</h1>
            </div>
            <div className="service-box">
              <h1 className="title">Branding</h1>
            </div>
            <div className="triangle-shape" />
          </div>

          <div className="vertical-content">
            Everything we make must meet our three experience principles: smart,
            simple and human. While these never <span>budge</span>, we are
            proudly flexible in our process; continually adapting our methods to
            meet the specific challenges of each <span>project</span>.
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Portfolio;
