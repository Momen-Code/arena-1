import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//Hooks
import useServiceHook from "./hooks";
import { useOnClickOutside } from "../../../hooks";

//Style
import "./style.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

//Components
import { NavBar } from "../../../components";

//Assets
// @ts-ignore
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
// @ts-ignore
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const Services = () => {
	const { getServices, addService, deleteService, editService } = useServiceHook();
	const [services, setServices] = useState([]);
	const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const defaultServiceObj = {
		en: {
			title: "",
			description: "",
			subservices: [],
		},
		ar: {
			title: "",
			description: "",
			subservices: [],
		},
		slug: "",
		cover: "",
	};

	const [serviceObj, setServiceObj] = useState(defaultServiceObj);
	const [activeLanguage, setActiveLanguage] = useState("en");

	const addBoxRef = useOnClickOutside(() => {
		setIsAddBoxVisible(false);
		setIsEditMode(false);
		setServiceObj(defaultServiceObj);
	});

	useEffect(() => {
		(async () => {
			setServices(await getServices());
		})();
	}, []);

	return (
		<div className="services-container">
			<div className="navbar-container">
				<NavBar />
			</div>

			<div className="add-btn" onClick={() => setIsAddBoxVisible(true)}>
				Add Service
			</div>
			<div className="multi-tap">
				<div className={activeLanguage == "en" ? "active" : ""} onClick={() => setActiveLanguage("en")}>
					English
				</div>
				<div className={activeLanguage == "ar" ? "active" : ""} onClick={() => setActiveLanguage("ar")}>
					Arabic
				</div>
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Description</th>
							<th>Sub Services</th>
							<th>Cover</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{services &&
							services.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item[activeLanguage].title}</td>
									<td>{item[activeLanguage].description}</td>
									<td>
										{item[activeLanguage].subservices.map((item) => (
											<>
												1- {item.title}
												<br />
											</>
										))}
									</td>
									<td>
										<img alt={item.en.title} src={item.cover} />
									</td>
									<td className="action-btns">
										<button
											className="icon-btn"
											onClick={() => {
												setServiceObj(item);
												setIsEditMode(true);
												setIsAddBoxVisible(true);
											}}
										>
											<EditIcon />
										</button>
										<button
											className="icon-btn"
											onClick={async () => {
												(await deleteService(item._id)) && setServices(await getServices());
											}}
										>
											<DeleteIcon />
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{isAddBoxVisible && (
				<div className="floating-box-container">
					<div className="data-box" ref={addBoxRef}>
						<div className="closing" onClick={() => setIsAddBoxVisible(false)}>
							<span></span>
							<span></span>
						</div>
						<form onSubmit={(e) => e.preventDefault()}>
							<h3> {isEditMode ? "Edit Service" : "Add a new Service"}</h3>
							<div className="input-items">
								<div className="multi-tap">
									<div className={activeLanguage == "en" ? "active" : ""} onClick={() => setActiveLanguage("en")}>
										English
									</div>
									<div className={activeLanguage == "ar" ? "active" : ""} onClick={() => setActiveLanguage("ar")}>
										Arabic
									</div>
								</div>
								<div className="input-item">
									<input
										placeholder="Title"
										type="text"
										value={serviceObj[activeLanguage].title}
										onChange={(e) =>
											setServiceObj({
												...serviceObj,
												[activeLanguage]: { ...serviceObj[activeLanguage], title: e.target.value },
											})
										}
									/>
								</div>

								<div className="input-item">
									<textarea
										placeholder="Description"
										value={serviceObj[activeLanguage].description}
										onChange={(e) =>
											setServiceObj({
												...serviceObj,
												[activeLanguage]: { ...serviceObj[activeLanguage], description: e.target.value },
											})
										}
									></textarea>
									<div className="input-item">
										<input
											placeholder="Cover url"
											type="text"
											value={serviceObj.cover}
											onChange={(e) =>
												setServiceObj({
													...serviceObj,
													cover: e.target.value,
												})
											}
										/>
									</div>
								</div>
								{serviceObj[activeLanguage].subservices.map((item, index, subservices) => (
									<>
										<span className="line"></span>
										<div key={index} className="input-item" style={{ display: "flex" }}>
											<input
												placeholder="title"
												type="text"
												value={item.title}
												onChange={(e) => {
													subservices[index].title = e.target.value;
													setServiceObj({
														...serviceObj,
														[activeLanguage]: { ...serviceObj[activeLanguage], subservices },
													});
												}}
											/>
											<div className="btn-container">
												{index == 0 ? (
													<button
														className="plus-btn"
														onClick={() => {
															setServiceObj({
																...serviceObj,
																[activeLanguage]: {
																	...serviceObj[activeLanguage],
																	subservices: [...subservices, { title: "", cover: "" }],
																},
															});
														}}
													>
														+
													</button>
												) : (
													<button
														className="plus-btn"
														onClick={() => {
															subservices.splice(index, 1);
															setServiceObj({
																...serviceObj,
																[activeLanguage]: {
																	...serviceObj[activeLanguage],
																	subservices,
																},
															});
														}}
													>
														-
													</button>
												)}
											</div>
										</div>
										<div className="input-item">
											<input
												placeholder="Cover url"
												value={item.cover}
												onChange={(e) => {
													subservices[index].cover = e.target.value;
													setServiceObj({
														...serviceObj,
														[activeLanguage]: { ...serviceObj[activeLanguage], subservices },
													});
												}}
											/>
										</div>
									</>
								))}
								<div className="btn-container">
									<button
										onClick={async () => {
											if (!isEditMode) {
												const service = await addService(serviceObj);
												if (service) {
													setServices([...services, service]);
													setIsAddBoxVisible(false);
												}
											} else {
												const service = await editService(serviceObj);
												if (service) {
													setServices([...services, service]);
													setIsAddBoxVisible(false);
													setServiceObj(defaultServiceObj);
													setServices(await getServices());
												}
											}
										}}
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Services;
