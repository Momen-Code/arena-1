import { useTranslation } from "react-i18next";

//Components
import { Header, Footer } from "../../../components";
//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../../assets/img/circle-shape-gray.png";

const ContactUs = () => {
  const { t, i18n } = useTranslation("translations");

  return (
    <div
      className="contact-us-container"
      style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
    >
      <Header />
      <div className="info-container">
        <div className="contact-txt">
          {i18n.language == "en"
            ? t("CONTACT_US").split(" ")[0]
            : t("CONTACT_US")}
        </div>
        <div className="info-wrapper">
          <img className="circle-img" src={CircleShape} alt="" />
          <div className="us-txt">{i18n.language == "en" ? "US" : ""}</div>
          <div className="information">
            <div>{t("ADDRESS_VALUE")}</div>
            <div dir="ltr">+966 56 112 2994</div>
            <div>{t("FOR_QUESTIONS_COMPLAINS")}</div>
            <div>{t("CONTACT_US_AT")}</div>
            <div>SALES@ARENA.com</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
