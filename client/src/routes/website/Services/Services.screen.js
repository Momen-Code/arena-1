import { useEffect, useState } from 'react';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import { motion } from 'framer-motion';
import servicesData from '../../../util/services';

//Components
import { Header, Footer } from '../../../components';

//Style
import './style.scss';

const Services = () => {
	const history = useHistory();
	const { pathname, state } = useLocation();
	const { path } = useRouteMatch();

	const [selectedService, setSelectedService] = useState(0);

	// useEffect(() => {
	//   document.documentElement.scrollTop = 0;

	//   setTimeout(() => {
	//     window.addEventListener("scroll", handleScroll);
	//   }, 2000);
	//   return () => window.removeEventListener("scroll", handleScroll);
	// }, [lastYPos]);

	// const handleScroll = (e) => {
	//   const yPos = window.scrollY;
	//   const isScrollUp = yPos < 20;

	//   if (isScrollUp) {
	//     history.push("/who-we-are", { prevPath: "/our-services" });
	//   } else {
	//     history.push("/our-services", { prevPath: "/our-services" });
	//   }
	// };

	const pageVariants =
		state && state.prevPath == '/who-we-are'
			? {
					initial: {
						y: '100vh',
					},
					in: {
						y: 0,
					},
					out: {},
			  }
			: {
					initial: {},
					in: {
						opacity: 1,
					},
					out: {
						opacity: 0,
					},
			  };

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
		<motion.div
			className="services-container"
			initial="initial"
			animate="in"
			exit=""
			variants={pageVariants}
			transition={{ duration: 1 }}
		>
			<Header />
			<div className="page-container">
				<div className="left-wrapper">
					<div className="our-services-txt">
						{['O', 'U', 'R'].map((letter, i) => (
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
						{['S', 'E', 'R', 'V', 'I', 'C', 'E', 'S'].map((letter, i) => (
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
				</div>
				<div className="right-wrapper">
					<div className="services-wrapper">
						<div className="btns-grid">
							{servicesData.map((service, i) => (
								<button
									className={`service-btn ${i == selectedService ? 'active' : ''}`}
									key={i}
									onClick={() => setSelectedService(i)}
								>
									{service.title}
								</button>
							))}
						</div>
						{servicesData.map(
							(service, i) =>
								i == selectedService && (
									<div className="services-grid">
										{service.subservices.map((subservice, i) => (
											<Link to={`${path}/${service.slug}`} className="service-box" key={i}>
												<h1 className="title">{subservice.title}</h1>
											</Link>
										))}
										<div className="triangle-shape" />
									</div>
								)
						)}
					</div>

					<div className="vertical-content">
						Everything we make must meet our three experience principles: smart, simple and human. While
						these never <span>budge</span>, we are proudly flexible in our process; continually adapting our
						methods to meet the specific challenges of each <span>project</span>.
					</div>
				</div>
			</div>

			<Footer />
		</motion.div>
	);
};

export default Services;
