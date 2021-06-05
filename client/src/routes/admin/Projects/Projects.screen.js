import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//Hooks
import useProjectHook from "./hooks";
import useServiceHook from "../Services/hooks";
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

const Projects = () => {
	const { getProjects, addProject, deleteProject, editProject } = useProjectHook();
	const { getServices } = useServiceHook();
	const [projects, setProjects] = useState([]);
	const [services, setServices] = useState([]);
	const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [projectObj, setProjectObj] = useState({
		en: {
			title: "",
			description: "",
		},
		ar: {
			title: "",
			description: "",
		},
		type: "",
		thumbnail: "",
		slides: [""],
	});
	const [activeLanguage, setActiveLanguage] = useState("en");

	const addBoxRef = useOnClickOutside(() => {
		setIsAddBoxVisible(false);
		setIsEditMode(false);
		setProjectObj({
			en: {
				title: "",
				description: "",
			},
			ar: {
				title: "",
				description: "",
			},
			type: "",
			thumbnail: "",
			slides: [""],
		});
	});

	useEffect(() => {
		(async () => {
			setProjects(await getProjects());
			setServices(await getServices());
		})();
	}, []);

	useEffect(() => {
		console.log(projectObj.slides);
	}, [projectObj]);

	return (
		<div className="projects-container">
			<div className="navbar-container">
				<NavBar />
			</div>

			<div className="add-btn" onClick={() => setIsAddBoxVisible(true)}>
				Add Project
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
							<th>Type</th>
							<th>Thumbnail</th>
							<th>Slides</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{projects &&
							projects.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{activeLanguage == "ar" ? item.ar.title : item.en.title}</td>
									<td>{activeLanguage == "ar" ? item.ar.description : item.en.description}</td>
									<td>{item.type}</td>
									<td>
										<img alt={item.en.title} src={item.thumbnail} />
									</td>
									<td>
										<Swiper spaceBetween={0} slidesPerView={1} pagination={{ clickable: true }}>
											{item.slides.map((img) => (
												<SwiperSlide style={{ width: 160 }}>
													<img src={img} className="slider-img" />
												</SwiperSlide>
											))}
										</Swiper>
									</td>
									<td className="action-btns">
										<button
											className="icon-btn"
											onClick={() => {
												setProjectObj(item);
												setIsEditMode(true);
												setIsAddBoxVisible(true);
											}}
										>
											<EditIcon />
										</button>
										<button
											className="icon-btn"
											onClick={() => {
												deleteProject(item._id);
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
							<h3>Add a new Project</h3>
							<div className="input-items">
								<div className="select-item">
									<select
										onChange={(e) => setProjectObj({ ...projectObj, type: e.target.value })}
										value={projectObj.type}
									>
										<option value="">Select Type</option>
										{services && services.map((item, index) => <option value={item.en.title}>{item.en.title}</option>)}
									</select>
									<span></span>
								</div>
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
										value={projectObj[activeLanguage].title}
										onChange={(e) =>
											setProjectObj({
												...projectObj,
												[activeLanguage]: { ...projectObj[activeLanguage], title: e.target.value },
											})
										}
									/>
								</div>

								<div className="input-item">
									<textarea
										placeholder="Description"
										value={projectObj[activeLanguage].description}
										onChange={(e) =>
											setProjectObj({
												...projectObj,
												[activeLanguage]: { ...projectObj[activeLanguage], description: e.target.value },
											})
										}
									></textarea>
									<div className="input-item">
										<input
											placeholder="Thumbnail url"
											type="text"
											value={projectObj.thumbnail}
											onChange={(e) =>
												setProjectObj({
													...projectObj,
													thumbnail: e.target.value,
												})
											}
										/>
									</div>
									{projectObj.slides.map((item, index, slides) => (
										<div key={index} className="input-item" style={{ display: "flex" }}>
											<input
												placeholder="Slide url"
												type="text"
												value={item}
												onChange={(e) => {
													slides[index] = e.target.value;
													console.log("inside", slides);
													setProjectObj({
														...projectObj,
														slides,
													});
												}}
											/>
											<div className="btn-container">
												{index == 0 ? (
													<button
														className="plus-btn"
														onClick={() => {
															setProjectObj({
																...projectObj,
																slides: [...slides, ""],
															});
														}}
													>
														+
													</button>
												) : (
													<button
														className="plus-btn"
														onClick={() => {
															slides.splice(index, 1);
															setProjectObj({
																...projectObj,
																slides,
															});
														}}
													>
														-
													</button>
												)}
											</div>
										</div>
									))}
								</div>
								<div className="btn-container">
									<button
										onClick={async () => {
											if (!isEditMode) {
												const project = await addProject(projectObj);
												if (project) {
													setProjects([...projects, project]);
													setIsAddBoxVisible(false);
												}
											} else {
												const project = await editProject(projectObj);
												if (project) {
													setProjects([...projects, project]);
													setIsAddBoxVisible(false);
													setProjects(await getProjects());
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

export default Projects;
