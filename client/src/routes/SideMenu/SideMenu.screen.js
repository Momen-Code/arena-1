import { motion } from "framer-motion";
import { Link } from "react-router-dom";
//Components
import { Header } from "../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../assets/img/circle-shape-primary.png";

const SideMenu = () => {
  const links = [
    {
      url: "/",
      label: "Home",
    },
    {
      url: "/our-services",
      label: "Services",
    },
    {
      url: "/portfolio",
      label: "Portfolio",
    },
    {
      url: "/",
      label: "Careers",
    },
    {
      url: "/who-we-are",
      label: "About us",
    },
  ];
  const circleImgVariants = {
    initial: {
      y: -250,
      x: 250,
    },
    in: {
      y: 0,
      x: 0,
    },
    out: {
      y: -250,
      x: 250,
    },
  };

  const circleImgTransition = {
    duration: 2,
    type: "spring",
  };

  const linkVariants = {
    initial: (i) => ({
      opacity: 0,
      x: (i + 1) * 100,
    }),
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: 100,
    },
  };

  const leftImageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -1000,
    },
  };

  
  return (
    <div className="sidemenu-container">
      <Header getquote={false} menuOpen={true} />
      <motion.div
        className="circle-img-container"
        initial="initial"
        animate="in"
        exit="out"
        variants={circleImgVariants}
        transition={circleImgTransition}
      >
        <img src={CircleShape} alt="" />
      </motion.div>
      <div className="centered-content">
        <motion.div
          className="left-wrapper"
          initial="initial"
          animate="in"
          exit="out"
          variants={leftImageVariants}
          transition={{ duration: 1, type: "spring" }}
        ></motion.div>
        <div className="right-wrapper">
          {links.map((link, i) => (
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              custom={i}
              variants={linkVariants}
              transition={{ type: "spring", duration: 1 }}
            >
              <Link to={link.url}>{link.label}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
