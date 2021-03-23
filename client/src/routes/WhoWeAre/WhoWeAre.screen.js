import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

//Components
import { Header, VerticalText } from "../../components";
//Style
import "./style.scss";

const WhoWeAre = () => {
  const history = useHistory();
  const { pathname, state } = useLocation();

  const [lastYPos, setLastYPos] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 2000);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastYPos]);

  const handleScroll = (e) => {
    const yPos = window.scrollY;
    const isScrollUp = yPos < 20;

    if (isScrollUp) {
      history.push("/", { prevPath: "/who-we-are" });
    } else {
      history.push("/our-services", { prevPath: "/who-we-are" });
    }
  };

  const pageVariants = {
    initial: {},
    in: {},
    out: {},
  };

  const bigTxtVariants = {
    initial: (i) => ({
      opacity: i * 0.1,
      x: (i + 1) * 100,
    }),
    in: {
      opacity: 1,
      x: 0,
    },
    out: {},
  };

  return (
    <motion.div
      className="who-we-are-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 2 }}
    >
      <Header />
      <div className="left-wrapper"></div>
      <div className="right-wrapper">
        <div className="whoweare-big">
          {["Who", "We", "Are"].map((word, i) => (
            <motion.span
              initial="initial"
              animate="in"
              exit="out"
              custom={i}
              variants={bigTxtVariants}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        <div className="vertical-content">
          <VerticalText>
            We design digital products that go beyond pure functionality and
            usability to evoke trust, joy and brand loyalty. Since 2003 we've
            been honing our craft as UX and UI specialists.
          </VerticalText>
          <VerticalText>
            Sennep means mustard. Our secret sauce is adding a kick to the bland
            sandwiches of the digital world – raising smiles as well as the
            bottom line.
          </VerticalText>
          <VerticalText>
            Everything we make must meet our three experience principles: smart,
            simple and human. While these never budge, we are proudly flexible
            in our process; continually adapting our methods to meet the
            specific challenges of each project.
          </VerticalText>
        </div>
      </div>
      <div className="circle-shape"></div>
    </motion.div>
  );
};

export default WhoWeAre;
