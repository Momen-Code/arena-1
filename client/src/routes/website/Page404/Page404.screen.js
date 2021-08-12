import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Components
import { Header, Footer } from "../../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../../assets/img/circle-shape-primary.png";

const Page404 = () => {
  const { i18n } = useTranslation("translations");
  return (
    <div
      className="page404-container"
      style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
    >
      <Header />
      <div className="page-container">
        <img className="circle-img" src={CircleShape} alt="" />
        <div className="page-wrapper">
          <h1>404</h1>
          <h3>The page you are looking for doesn't exist :)</h3>
          <Link to="/" className="go-home-btn">
            Go Home
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page404;
