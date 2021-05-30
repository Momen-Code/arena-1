import { useTranslation } from "react-i18next";
import { useQuoteContext } from "../../../provider";
//Style
import { Link } from "react-router-dom";
import "./style.scss";

//Assets
// @ts-ignore
import Logo from "../../../assets/img/logo-gray.png";

const Footer = () => {
	const { setQuoteActive } = useQuoteContext();
	const { t, i18n } = useTranslation("translations");

	return (
		<div className="footer-container">
			<div className="logo-container">
				<Link to="/">
					<img className="logo-img" alt="ARENA" src={Logo} />
				</Link>
				<div className="copyright">© 2020 ARCHAOS</div>
			</div>
			<div className="nav-links">
				<h2>{t("QUICK_LINKS")}</h2>
				<div className="links">
					<div>
						<Link to="/">{t("HOME_PAGE")}</Link>
						<a>{t("WALLPAPER")}</a>
						<a onClick={() => setQuoteActive(true)}>{t("GET_A_QUOTE")}</a>
					</div>
					{/* <div>
						<a>{t('THE_PRESS')}</a>
						<a>{t('CONTACT_US')}</a>
						<a>{t('PARTNER_PROGRAM')}</a>
						<a>{t('CAREERS')}</a>
					</div> */}
				</div>
			</div>
			<div className="address-container">
				<h2>{t("ADDRESS")}</h2>
				{t("ADDRESS_VALUE")}
				<br />
				{t("SAUDI_ARABIA")}
			</div>
			<div className="designed-archaos">
				<h3>{t("DESIGNED_BY")} ARCHAOS</h3>
				<div className="img-bg"></div>
			</div>
		</div>
	);
};

export default Footer;
