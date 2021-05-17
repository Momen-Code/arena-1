import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import servicesData from '../../../util/services';

//Components
import { Header, Footer } from '../../../components';

//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-primary.png';
// @ts-ignore
import ServiceImage from '../../../assets/img/service-page.png';

const ServicePage = () => {
	const { t, i18n } = useTranslation('translations');
	const { service: serviceSlug } = useParams();

	const [selectedIndex, setSelectedIndex] = useState(
		servicesData.indexOf(servicesData.find((s) => s.slug == serviceSlug))
	);

	useEffect(() => {
		if (selectedIndex == -1) window.location.href = '/our-services';
	}, []);
	return (
		<div className="service-page-container">
			<Header />
			<div className="page-container">
				<div className="content-container">
					<Link to="/our-services" className="back-btn">
						{t('BACK_TO_SERVICES')}
						{i18n.dir() == 'ltr' ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
					</Link>
					<div className="images-container">
						<img className="bg-img" src={ServiceImage} alt="" />
						<img className="circle-img" src={CircleShape} alt="" />
					</div>
					<div className="header-info">
						<h1>{servicesData[selectedIndex].title.replace(' ', '\n')}</h1>
						<p>{servicesData[selectedIndex].description}</p>
					</div>
					<div className="content-info">
						<h3>{t('HOW_CAN_WE_HELP_YOU')}</h3>
						{servicesData[selectedIndex].subservices.map((service) => (
							<p>{service.title}-</p>
						))}
					</div>
					<button className="get-quote-btn">{t('GET_A_QUOTE')}</button>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ServicePage;
