import { useState, useEffect } from "react";
import { useAppContext } from "../../../provider";
import BounceLoader from "react-spinners/BounceLoader";

//Style
import "./style.scss";

const Loader = () => {
	const { isLoading } = useAppContext();
	const [isVisible, setIsVisible] = useState(isLoading);

	useEffect(() => {
		if (!isLoading) {
			setTimeout(() => setIsVisible(false), 700);
		} else {
			setIsVisible(true);
		}
	}, [isLoading]);

	return (
		isVisible && (
			<div className={`loader-container ${isLoading ? "" : "finished"}`}>
				<BounceLoader loading color="#ffffff" size={50} />
			</div>
		)
	);
};

export default Loader;
