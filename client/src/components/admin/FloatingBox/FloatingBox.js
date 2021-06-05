import { useEffect, useRef, useState } from "react";

//Style
import "./style.scss";

const FloatingBox = ({ title, btnName, inputs, selectTitle, isVisible, setIsVisible, onSubmit }) => {
	useEffect(() => {
		window.addEventListener("mouseup", containerHandler);

		return () => window.removeEventListener("mouseup", containerHandler);
	}, []);

	const boxRef = useRef(null);

	const containerHandler = (e) => {
		e.preventDefault();

		if (boxRef.current && !boxRef.current.contains(e.target)) {
			setIsVisible(false);
		}
	};

	return (
		isVisible && (
			<div className="float-box-container">
				<div ref={boxRef} className="data-box">
					<div className="closing" onClick={() => setIsVisible(false)}>
						<span></span>
						<span></span>
					</div>
					<form method="POST" onSubmit={(e) => e.preventDefault()}>
						{title && <h3>{title}</h3>}
						<div className="input-items">
							{inputs.length !== 0 &&
								inputs.map((input, i) =>
									input.tag === "input" ? (
										<>
											<div className="input-item">
												{input.label && <label>{input.label}</label>}
												<input {...input.props} />
											</div>
										</>
									) : input.tag === "select" ? (
										<div className="select-item">
											<select {...input.props}>
												<option selected unselectable="on">
													{selectTitle}
												</option>
												{input.options.map((option) => (
													<option value={option.value}>{option.label}</option>
												))}
											</select>
											<span></span>
										</div>
									) : null
								)}
							<div className="btn-container">
								<button className="save-btn" type="submit" onClick={onSubmit || null}>
									{btnName}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	);
};
export default FloatingBox;
