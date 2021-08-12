import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useQuoteContext } from "../../../provider";

//Components
import { Header, Footer } from "../../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../../assets/img/circle-shape-gray.png";

import SERVICES_EN from "../../../util/services-en";
import SERVICES_AR from "../../../util/services-ar";

const ServicePage = () => {
  const { setQuoteActive } = useQuoteContext();
  const { t, i18n } = useTranslation("translations");
  const [SERVICES, setSERVICES] = useState(
    i18n.language == "ar" ? SERVICES_AR : SERVICES_EN
  );
  const { service: serviceSlug } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(
    SERVICES.indexOf(SERVICES.find((s) => s.slug == serviceSlug))
  );

  useEffect(() => {
    if (selectedIndex == -1) window.location.href = "/our-services";
  }, []);
  return (
    <div
      className="service-page-container"
      style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
    >
      <Header />
      <div className="page-container">
        <div className="content-container">
          <Link to="/our-services" className="back-btn">
            {t("BACK_TO_SERVICES")}
            {i18n.dir() == "ltr" ? (
              <AiOutlineArrowRight />
            ) : (
              <AiOutlineArrowLeft />
            )}
          </Link>
          <div className="images-container">
            <img
              className="bg-img"
              src={SERVICES[selectedIndex].cover}
              alt=""
            />
            <img className="circle-img" src={CircleShape} alt="" />
          </div>
          <div className="header-info">
            <h1>{SERVICES[selectedIndex].title.replace(" ", "\n")}</h1>
            <p>{SERVICES[selectedIndex].description}</p>
          </div>
          <div className="content-info">
            <h3>{t("HOW_CAN_WE_HELP_YOU")}</h3>
            {SERVICES[selectedIndex].subservices.map((service) => (
              <p>{service.title}-</p>
            ))}
          </div>
          <button
            className="get-quote-btn"
            onClick={() => setQuoteActive(true)}
          >
            {t("GET_A_QUOTE")}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
