import { useEffect } from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//Components
import { Header, Footer } from '../../../components';

//Style
import './style.scss';

//Assets
// @ts-ignore
import CircleShape from '../../../assets/img/circle-shape-primary.png';

const Home = () => {
	const { t, i18n } = useTranslation('translations');

	const history = useHistory();
	const { scrollYProgress } = useViewportScroll();

	// useEffect(() => {
	//   document.documentElement.scrollTop = 0;
	//   setTimeout(() => {
	//     window.addEventListener("scroll", handleScroll);
	//   }, 2000);
	//   return () => window.removeEventListener("scroll", handleScroll);
	// }, []);

	// const handleScroll = (e) => {
	//   const yPos = window.scrollY;
	//   const isScrollUp = yPos < 20;

	//   if (isScrollUp) {
	//     // history.push("/who-we-are", { prevPath: "/" });
	//   } else {
	//     history.push("/who-we-are", { prevPath: "/" });
	//   }
	// };

	const pageVariants = {
		initial: {},
		in: {
			y: 0,
		},
		out: {},
	};

	const lineVariants = {
		initial: {
			x: '-50px',
			opacity: 0,
		},
		in: {
			x: 0,
			opacity: 1,
		},
		out: {
			x: '100%',
			opacity: 0,
		},
	};

	const lineTransitions = {
		duration: 0.4,
	};

	return (
		<motion.div
			className="home-container"
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
			transition={{ duration: 1 }}
		>
			<Header logoGray={i18n.dir() == 'rtl' ? false : true} />
			<div className="home-flex">
				<div className="left-wrapper">
					<motion.div className="info-text">
						<motion.h5
							initial="initial"
							animate="in"
							exit="out"
							variants={lineVariants}
							transition={lineTransitions}
						>
							{t('WHO_WE_ARE_TXT')}
						</motion.h5>
					</motion.div>
				</div>
				<div className="right-wrapper">
					<img className="circle-img" src={CircleShape} alt="" />
				</div>
			</div>

			<Footer />
		</motion.div>
	);
};

export default Home;
