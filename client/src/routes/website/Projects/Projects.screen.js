import { useState, useEffect } from 'react';
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

import PROJECTSEN from '../../../util/projects-en';
import PROJECTSAR from '../../../util/projects-ar';

const Projects = () => {
	const { t, i18n } = useTranslation('translations');
	const [PROJECTS, setPROJECTS] = useState(i18n.language == 'ar' ? PROJECTSAR : PROJECTSEN);
	const projectsTypes = PROJECTS.filter((v, i, a) => a.findIndex((t) => t.type === v.type) === i).map(
		(project) => project.type
	);
	const location = useLocation();
	const [activeProjects, setActiveProjects] = useState(PROJECTS.slice(0, window.innerWidth > 576 ? 6 : 4));
	const [inActiveProjects, setInActiveProjects] = useState(PROJECTS.slice(window.innerWidth > 576 ? 6 : 4));
	const [isLoading, setIsLoading] = useState(false);
	const [selectedType, setSelectedType] = useState(-1);

	useEffect(() => {}, [i18n.language]);

	useEffect(() => {
		if (selectedType == -1) {
			setActiveProjects(PROJECTS.slice(0, window.innerWidth > 576 ? 6 : 4));
			setInActiveProjects(PROJECTS.slice(window.innerWidth > 576 ? 6 : 4));
		} else {
			setActiveProjects(
				PROJECTS.filter((project) => project.type == projectsTypes[selectedType]).slice(
					0,
					activeProjects.length + (window.innerWidth > 576 ? 6 : 4)
				)
			);
			setInActiveProjects(
				PROJECTS.filter((project) => project.type == projectsTypes[selectedType]).slice(
					activeProjects.length + (window.innerWidth > 576 ? 6 : 4)
				)
			);
		}
	}, [selectedType]);

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
					<div className="right-items">
						<div className="btns-container">
							<button
								className={`all-types-btn ${selectedType == -1 ? 'active' : ''}`}
								onClick={() => setSelectedType(-1)}
							>
								{t('ALL')}
							</button>
							<div className="btns-grid">
								{projectsTypes.map((type, i) => (
									<button
										className={`type-btn ${i == selectedType ? 'active' : ''}`}
										onClick={() => setSelectedType(i)}
									>
										{type}
									</button>
								))}
							</div>
						</div>
						<div className="vertical-content">{t('PROJECTS_QUOTE')}</div>
					</div>
				</div>
				<div className="bottom-wrapper">
					<div className="projects-grid">
						{activeProjects.map((project, i) => (
							<Link to={`${location.pathname}/${project.slug}`} className="project-box" key={i}>
								<div className="project-img">
									<img alt="project image" src={project.thumbnail} />
								</div>
								<h1 className="title">{project.title}</h1>
							</Link>
						))}
					</div>
					<div className="projects-grid inactive">
						{inActiveProjects.map((project, i) => (
							<div className="project-box" key={i}>
								<div className="project-img">
									<img alt="project image" src={project.thumbnail} />
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
										PROJECTS.slice(0, activeProjects.length + (window.innerWidth > 576 ? 6 : 4))
									);
									setInActiveProjects(
										PROJECTS.slice(activeProjects.length + (window.innerWidth > 576 ? 6 : 4))
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
