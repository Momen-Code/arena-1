import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PulseLoader from 'react-spinners/PulseLoader';

//Components
import { Header, Footer } from '../../../components';

//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-gray.png';

import PROJECTS from '../../../util/projects-en';

const Projects = () => {
	const { t, i18n } = useTranslation('translations');
	const location = useLocation();
	const [activeProjects, setActiveProjects] = useState(PROJECTS.slice(0, window.innerWidth > 576 ? 3 : 4));
	const [inActiveProjects, setInActiveProjects] = useState(PROJECTS.slice(window.innerWidth > 576 ? 3 : 4));
	const [isLoading, setIsLoading] = useState(false);

	const letterVariants = {
		initial: (i) => ({
			x: i * -150,
			opacity: 0,
		}),
		in: (i) => ({
			x: 0,
			opacity: 1,
			transition: {
				delay: (i + 1) * 0.2,
			},
		}),
		out: (i) => ({
			x: -150,
			opacity: 0,
			transition: {
				delay: (i + 1) * 0.1,
			},
		}),
	};

	return (
		<div className="projects-container">
			<Header />
			<div className="page-container">
				<img className="circle-img" src={CircleShape} alt="" />

				<div className="top-wrapper">
					<div className="our-projects-txt">
						{i18n.dir() == 'rtl' ? (
							<>
								<motion.span
									initial="initial"
									animate="in"
									exit="out"
									variants={letterVariants}
									custom={1}
									transition={{
										duration: 1,
									}}
								>
									{t('OUR_PROJECTS').split(' ')[0]}
								</motion.span>
								<br />
								<motion.span
									initial="initial"
									animate="in"
									exit="out"
									variants={letterVariants}
									custom={1}
									transition={{
										duration: 1,
									}}
								>
									{t('OUR_PROJECTS').split(' ')[1]}
								</motion.span>
							</>
						) : (
							<>
								{t('OUR_PROJECTS')
									.split(' ')[0]
									.split('')
									.map((letter, i) => (
										<motion.span
											initial="initial"
											animate="in"
											exit="out"
											variants={letterVariants}
											custom={i}
											transition={{
												duration: 1,
											}}
										>
											{letter}
										</motion.span>
									))}
								<br />
								{t('OUR_PROJECTS')
									.split(' ')[1]
									.split('')
									.map((letter, i) => (
										<motion.span
											initial="initial"
											animate="in"
											exit="out"
											variants={letterVariants}
											custom={i}
											transition={{
												duration: 1,
											}}
										>
											{letter}
										</motion.span>
									))}
							</>
						)}
					</div>
					<div className="vertical-content">{t('TEXT_INFO')}</div>
				</div>
				<div className="bottom-wrapper">
					<div className="projects-grid">
						{activeProjects.map((project, i) => (
							<Link to={`${location.pathname}/${project.slug}`} className="project-box" key={i}>
								<div className="project-img">
									<img alt="project image" src={`/images/projects/${project.thumbnail}`} />
								</div>
								<h1 className="title">{project.title}</h1>
							</Link>
						))}
					</div>
					<div className="projects-grid inactive">
						{inActiveProjects.map((project, i) => (
							<div className="project-box" key={i}>
								<div className="project-img">
									<img alt="project image" src={`/images/projects/${project.thumbnail}`} />
								</div>
								<h1 className="title">{project.title}</h1>
							</div>
						))}
					</div>
					{inActiveProjects.length != 0 && (
						<button
							className="load-more-btn"
							onClick={() => {
								setIsLoading(true);
								setTimeout(() => {
									setIsLoading(false);
									setActiveProjects(
										PROJECTS.slice(0, activeProjects.length + (window.innerWidth > 576 ? 3 : 4))
									);
									setInActiveProjects(
										PROJECTS.slice(activeProjects.length + (window.innerWidth > 576 ? 3 : 4))
									);
								}, 800);
							}}
						>
							<PulseLoader loading={isLoading} color="#830a0a" />
							{!isLoading && t('LOAD_MORE')}
						</button>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Projects;
