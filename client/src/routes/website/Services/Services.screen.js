import { useEffect, useState } from "react";
import { useHistory, useLocation, Link, useRouteMatch } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

//Components
import { Header, Footer } from "../../../components";

//Style
import "./style.scss";

import SERVICES_EN from "../../../util/services-en";
import SERVICES_AR from "../../../util/services-ar";

const Services = () => {
  const { t, i18n } = useTranslation("translations");
  const [SERVICES, setSERVICES] = useState(
    i18n.language == "ar" ? SERVICES_AR : SERVICES_EN
  );

  const history = useHistory();
  const { pathname, state } = useLocation();
  const { path } = useRouteMatch();

  const [selectedService, setSelectedService] = useState(0);

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
      transition={{ duration: 1 }}
      style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
    >
      <Header />
      <div className="page-container">
        <div className="left-wrapper">
          <div className="our-services-txt">
            {i18n.dir() == "rtl" ? (
              <>
                <motion.span
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={letterVariants}
                  custom={2}
                  transition={{
                    duration: 1,
                  }}
                >
                  {t("OUR_SERVICES").split(" ")[0]}
                </motion.span>
                <br />
                <motion.span
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={letterVariants}
                  custom={2}
                  transition={{
                    duration: 1,
                  }}
                >
                  {t("OUR_SERVICES").split(" ")[1]}
                </motion.span>
              </>
            ) : (
              <>
                {t("OUR_SERVICES")
                  .split(" ")[0]
                  .split("")
                  .map((letter, i) => (
                    <motion.span
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={letterVariants}
                      custom={i}
                      transition={{
                        duration: 1,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                <br />
                {t("OUR_SERVICES").split(" ")[1] &&
                  t("OUR_SERVICES")
                    .split(" ")[1]
                    .split("")
                    .map((letter, i) => (
                      <motion.span
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={letterVariants}
                        custom={i}
                        transition={{
                          duration: 1,
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
              </>
            )}
          </div>
        </div>
        <div className="right-wrapper">
          <div className="services-wrapper">
            <div className="btns-container">
              <button
                className={`all-services-btn ${
                  selectedService == -1 ? "active" : ""
                }`}
                onClick={() => setSelectedService(-1)}
              >
                {t("ALL")}
              </button>
              <div className="btns-grid">
                {SERVICES.map((service, i) => (
                  <button
                    className={`service-btn ${
                      i == selectedService ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => setSelectedService(i)}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
            {SERVICES.map(
              (service, i) =>
                i == selectedService && (
                  <div className="services-grid">
                    {service.subservices.map((subservice, i) => (
                      <Link
                        to={`${path}/${service.slug}`}
                        className="service-box"
                        key={i}
                      >
                        <img alt={subservice.title} src={subservice.cover} />
                        <h1 className="title">{subservice.title}</h1>
                      </Link>
                    ))}
                  </div>
                )
            )}
            {selectedService == -1 && (
              <div className="services-grid">
                {SERVICES.map((service, i) =>
                  service.subservices.map((subservice, i) => (
                    <Link
                      to={`${path}/${service.slug}`}
                      className="service-box"
                      key={i}
                    >
                      <img alt={subservice.title} src={subservice.cover} />
                      <h1 className="title">{subservice.title}</h1>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="vertical-content">
            {SERVICES[selectedService == -1 ? 0 : selectedService].description}
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Services;
