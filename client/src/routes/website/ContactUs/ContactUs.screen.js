import { useTranslation } from 'react-i18next';

//Components
import { Header, Footer } from '../../../components';
//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-gray.png';

const ContactUs = () => {
	const { t, i18n } = useTranslation('translations');

	return (
		<div className="contact-us-container">
			<Header />
			<div className="info-container">
				<div className="contact-txt">
					{i18n.language == 'en' ? t('CONTACT_US').split(' ')[0] : t('CONTACT_US')}
				</div>
				<div className="info-wrapper">
					<img className="circle-img" src={CircleShape} alt="" />
					<div className="us-txt">{i18n.language == 'en' ? 'US' : ''}</div>
					<div className="information">
						<div>5 , YAHIA STREET , GLEEM , ALEXANDRIA</div>
						<div>+201065157968</div>
						<div>0324567859</div>
						<div>FOR QUIESTIONS {'&'} COMPLAINS</div>
						<div>CONTACT US AT</div>
						<div>ARENA.WORK@AR.COM</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ContactUs;
