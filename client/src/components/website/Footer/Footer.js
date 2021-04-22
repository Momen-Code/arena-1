import { useTranslation } from 'react-i18next';

//Style
import { Link } from 'react-router-dom';
import './style.scss';

const Footer = () => {
	const { t, i18n } = useTranslation('translations');

	return (
		<div className="footer-container">
			<div className="logo-container">
				<Link to="/">
					<h1>ARENA</h1>
				</Link>
				<div className="copyright">© 2020 ARCHAOS</div>
			</div>
			<div className="nav-links">
				<h2>{t('QUICK_LINKS')}</h2>
				<div className="links">
					<div>
						<a>{t('SECURITY')}</a>
						<a>{t('PRICING')}</a>
						<a>{t('REQUEST_DEMO')}</a>
					</div>
					<div>
						<a>{t('THE_PRESS')}</a>
						<a>{t('CONTACT_US')}</a>
						<a>{t('PARTNER_PROGRAM')}</a>
						<a>{t('CAREERS')}</a>
					</div>
				</div>
			</div>
			<div className="address-container">
				<h2>{t('ADDRESS')}</h2>
				AHMED YEHIA STREET , <br />
				BESIDE SHALABY PHARMACY AND L’ECLAIR ALEXANDRIA,
				<br /> EGYPT
			</div>
			<div className="designed-archaos">
				<h3>{t('DESIGNED_BY')} ARCHAOS</h3>
				<div className="img-bg"></div>
			</div>
		</div>
	);
};

export default Footer;
