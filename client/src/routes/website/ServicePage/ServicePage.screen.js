import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory, Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
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
	const { t } = useTranslation('translations');
	const { service: serviceSlug } = useParams();
	const history = useHistory();

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
					<Link to="/our-services" className="get-quote-btn back-btn">
						Back to services
						<AiOutlineArrowRight />
					</Link>
					<div className="images-container">
						<img className="bg-img" src={ServiceImage} alt="" />
						<img className="circle-img" src={CircleShape} alt="" />
					</div>
					<div className="header-info">
						<h1>{servicesData[selectedIndex].title.replace(' ', '\n')}</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel
							sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam
							eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
							accusantium nemo autem. Veritatis
						</p>
					</div>
					<div className="content-info">
						<h3>How Can We Help You ?</h3>
						{servicesData[selectedIndex].subservices.map((service) => (
							<p>{service.title}-</p>
						))}
					</div>
					<button className="get-quote-btn">Get a Quote</button>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ServicePage;
