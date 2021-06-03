import { useAppContext } from '../../../provider';
import BounceLoader from "react-spinners/BounceLoader";

//Style
import './style.scss';

const Loader = () => {
	const { isLoading } = useAppContext();

	return (
		isLoading && (
			<div className="loader-container">
				<BounceLoader loading color="#ffffff" size={50} />
			</div>
		)
	);
};

export default Loader;