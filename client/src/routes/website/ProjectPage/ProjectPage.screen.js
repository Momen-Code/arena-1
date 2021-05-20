import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory, Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Navigation, Pagination } from 'swiper';

import PROJECTS from '../../../util/projects-en';

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
	if (selectedIndex == -1) window.location.href = '/projects';

	return (
		<div className="project-page-container">
			<Header />
			<div className="page-container">
				<Link to="/projects" className="goback-btn">
					{t('BACK_TO_PROJECTS')}
					{i18n.dir() == 'ltr' ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
				</Link>
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
					>
						{PROJECTS[selectedIndex].slides.map((slide, i) => (
							<SwiperSlide key={i}>
								<img src={slide} alt={PROJECTS[selectedIndex].title} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className="btns-container">
					<button className="back-btn">{t('BACK')}</button>
					<button className="next-btn">{t('NEXT')}</button>
				</div>
				<div className="slider-footer">
					<img className="circle-img" src={CircleShape} alt="" />
					<h1 className="title">{PROJECTS[selectedIndex].title}</h1>
					<p>{PROJECTS[selectedIndex].description}</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProjectPage;
