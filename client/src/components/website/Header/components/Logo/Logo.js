import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//Style
import './style.scss';
//Assets
// @ts-ignore
import LogoImageGray from '../../../../../assets/img/logo-gray.png';
// @ts-ignore
import LogoImagePrimary from '../../../../../assets/img/logo-primary.png';

const Logo = ({gray = false}) => {
	// @ts-ignore
	const arenaVariants = {
		initial: {
			y: '-150px',
			opacity: 0,
		},
		in: (i) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: (i + 1) * 0.1,
			},
		}),
		out: (i) => ({
			y: '-150px',
			opacity: 0,
			transition: {
				delay: (i + 1) * 0.1,
			},
		}),
	};
	// @ts-ignore
	const mediaProductionVariants = {
		initial: {
			y: '50px',
			opacity: 0,
		},
		in: (i) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: (i + 1) * 0.1,
			},
		}),
		out: (i) => ({
			x: '-150px',
			opacity: 0,
			transition: {
				delay: (i + 1) * 0.1,
			},
		}),
	};
	const imageVariants = {
		initial: {
			y: '-150px',
			opacity: 0,
		},
		in: {
			y: 0,
			opacity: 1,
		},
		out: {
			x: '-150px',
			opacity: 0,
		},
	};

	return (
		<Link to="/" className="logo-container">
			<motion.img
				initial="initial"
				animate="in"
				exit="out"
				variants={imageVariants}
				transition={{
					duration: 0.8,
					y: { type: 'spring', stiffness: 200 },
				}}
				alt=""
				// @ts-ignore
				src={gray ? LogoImageGray : LogoImagePrimary}
			/>
			{/* <div className="arena">
				{['A', 'R', 'E', 'N', 'A'].map((letter, i) => (
					<motion.span
						initial="initial"
						animate="in"
						exit="out"
						variants={arenaVariants}
						custom={i}
						transition={{
							repeat: Infinity,
							delay: 2,
							y: { type: 'spring', stiffness: 200 },
						}}
					>
						{letter}
					</motion.span>
				))}
			</div>
			<div className="media-production">
				{'Media'.split('').map((letter, i) => (
					<motion.span
						key={i}
						initial="initial"
						animate="in"
						exit="out"
						variants={mediaProductionVariants}
						custom={i}
						transition={{
							repeat: Infinity,
							delay: 2,
							y: { type: 'spring', stiffness: 200 },
						}}
					>
						{letter}
					</motion.span>
				))}{' '}
				{'Production'.split('').map((letter, i) => (
					<motion.span
						key={i}
						initial="initial"
						animate="in"
						exit="out"
						variants={mediaProductionVariants}
						custom={i}
						transition={{
							repeat: Infinity,
							delay: 2,
							y: { type: 'spring', stiffness: 200 },
						}}
					>
						{letter}
					</motion.span>
				))}
			</div> */}
		</Link>
	);
};

export default Logo;
