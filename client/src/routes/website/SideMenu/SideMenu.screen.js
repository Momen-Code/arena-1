import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//Components
import { Header, Footer } from '../../../components';

//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-primary.png';

const SideMenu = () => {
	const { t } = useTranslation('translations');

	const links = [
		{
			url: '/who-we-are',
			label: t('ABOUT_US'),
		},
		{
			url: '/our-services',
			label: t('SERVICES'),
		},
		{
			url: '/projects',
			label: t('PROJECTS'),
		},
		{
			url: '/careers',
			label: t('CAREERS'),
		},
	];
	const circleImgVariants = {
		initial: {
			y: -250,
			x: 250,
		},
		in: {
			y: 0,
			x: 0,
		},
		out: {
			y: -250,
			x: 250,
		},
	};

	const circleImgTransition = {
		duration: 0.5,
		type: 'spring',
	};

	const linkVariants = {
		initial: (i) => ({
			opacity: 0,
			x: (i + 1) * 100,
		}),
		in: {
			opacity: 1,
			x: 0,
		},
		out: {
			opacity: 0,
			x: 100,
		},
	};

	const leftImageVariants = {
		initial: {
			opacity: 0,
			x: 100,
		},
		in: {
			opacity: 1,
			x: 0,
		},
		out: {
			opacity: 0,
			x: -1000,
		},
	};

	return (
		<div className="sidemenu-container">
			<Header getquote={false} menuOpen={true} />
			<div className="menu-container">
				<motion.div
					className="circle-img-container"
					initial="initial"
					animate="in"
					exit="out"
					variants={circleImgVariants}
					transition={circleImgTransition}
				>
					<img src={CircleShape} alt="" />
				</motion.div>
				<div className="centered-content">
					<Link to="/contact-us" className="contactus-btn-container">
						<motion.button
							className="contactus-btn"
							initial="initial"
							animate="in"
							exit="out"
							variants={leftImageVariants}
						>
							{t('CONTACT_US')}
						</motion.button>
					</Link>
					<motion.div
						className="left-wrapper"
						initial="initial"
						animate="in"
						exit="out"
						variants={leftImageVariants}
						transition={{ duration: 0.5, type: 'spring' }}
					></motion.div>
					<div className="right-wrapper">
						{links.map((link, i) => (
							<motion.div
								initial="initial"
								animate="in"
								exit="out"
								custom={i}
								variants={linkVariants}
								transition={{ type: 'spring', duration: 0.5 }}
							>
								<Link to={link.url}>{link.label}</Link>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default SideMenu;
