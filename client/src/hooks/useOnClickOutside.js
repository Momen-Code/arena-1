import { useEffect, useRef } from "react";

/*
 * This hook handles clicking outside of the component
 *
 * @param componentRef --> Reference to the compnent
 * @param onClickOutsideHandler --> The callback that needs to be triggered on dismissing the component
 */

const useOnClickOutside = (onClickOutsideHandler) => {
	const componentRef = useRef(null);

	useEffect(() => {
		window.addEventListener("mouseup", handleContainer);

		return () => window.removeEventListener("mouseup", handleContainer);
	}, []);

	const handleContainer = (e) => {
		e.preventDefault();

		if (componentRef.current && !componentRef.current.contains(e.target)) {
			onClickOutsideHandler();
		}
	};

	return componentRef;
};

export default useOnClickOutside;
