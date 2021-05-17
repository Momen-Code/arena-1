import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//Style
import './style.scss';

const Logo = () => {
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
			y: '-150px',
			opacity: 0,
			transition: {
				delay: (i + 1) * 0.1,
			},
		}),
	};

	return (
		<Link to="/" className="logo-container">
			<div className="arena">
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
			</div>
		</Link>
	);
};

export default Logo;
