import { useTranslation } from "react-i18next";
//Components
import { Header, Footer } from "../../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../../assets/img/circle-shape-primary.png";

const Careers = () => {
  const { t, i18n } = useTranslation("translations");

  return (
    <div className="careers-container" style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}>
      <Header />
      <div className="page-container">
        <div className="content-container">
          <h3>{t("CAREERS_TXT")}</h3>
          <div className="bg-image"></div>
          <img className="circle-img" src={CircleShape} alt="" />
          <button className="all-jobs-btn">{t("JOIN_US")}</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
