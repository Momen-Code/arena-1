import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import PROJECTS from '../../../util/projects';

//Style
import './style.scss';
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';

//Components
import { Header, Footer } from '../../../components';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-gray.png';

const ProjectPage = () => {
	SwiperCore.use([Navigation, Pagination]);
	const { t, i18n } = useTranslation('translations');
	const { project: projectSlug } = useParams();

	const [selectedIndex, setSelectedIndex] = useState(PROJECTS.indexOf(PROJECTS.find((s) => s.slug == projectSlug)));

	useEffect(() => {
		if (selectedIndex == -1) window.location.href = '/our-services';
	}, []);

	return (
		<div className="project-page-container">
			<Header />
			<div className="page-container">
				<div className="slider-container">
					<img className="circle-img" src={CircleShape} alt="" />
					<Swiper
						spaceBetween={0}
						slidesPerView={1}
						navigation={{
							prevEl: '.back-btn',
							nextEl: '.next-btn',
						}}
						autoplay={{ delay: 3000 }}
						pagination
						loop
						dir={i18n.dir()}
					>
						{PROJECTS[selectedIndex].slides.map((slide, i) => (
							<SwiperSlide key={i}>
								<img src={`/images/projects/${slide}`} alt={PROJECTS[selectedIndex].title} />
							</SwiperSlide>
						))}
					</Swiper>
					<div className="btns-container">
						<button className="back-btn">Back</button>
						<button className="next-btn">Next</button>
					</div>
				</div>
				<div className="slider-footer">
					<h1 className="title">{PROJECTS[selectedIndex].title}</h1>
					<p>{PROJECTS[selectedIndex].description}</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProjectPage;
