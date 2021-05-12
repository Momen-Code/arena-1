import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

//Components
import { Header, Footer } from '../../../components';

//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-primary.png';

const Projects = () => {
	const { t, i18n } = useTranslation('translations');

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

				<div className="left-wrapper">
					<div className="our-projects-txt">
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
					</div>
					<div className="vertical-content">{t('TEXT_INFO')}</div>
				</div>
				<div className="right-wrapper">
					<div className="projects-grid">
						<div className="projects-box">
							<h1 className="title">Project 01</h1>
						</div>
						<div className="projects-box">
							<h1 className="title">Project 02</h1>
						</div>
						<div className="projects-box">
							<h1 className="title">Project 03</h1>
						</div>
						<div className="projects-box">
							<h1 className="title">Project 04</h1>
						</div>
						<div className="triangle-shape" />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Projects;
