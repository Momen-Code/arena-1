import { useState, useEffect } from "react";
//Hooks
import useServiceHook from "./hooks";
import { useOnClickOutside } from "../../../hooks";

//Style
import "./style.scss";

//Components
import { NavBar } from "../../../components";

//Assets
// @ts-ignore
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
// @ts-ignore
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const Services = () => {
	const { getServices, addService, deleteService } = useServiceHook();
	const [services, setServices] = useState([]);
	const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
	const [serviceObj, setServiceObj] = useState({
		ar: { title: "", cover: "", description: "" },
		en: { title: "", cover: "", description: "" },
		parentId: null,
	});
	const [activeLanguage, setActiveLanguage] = useState("en");

	const addBoxRef = useOnClickOutside(() => setIsAddBoxVisible(false));

	useEffect(() => {
		(async () => {
			setServices(await getServices());
		})();
	}, []);
	return (
		<div className="users-container">
			<div className="navbar-container">
				<NavBar />
			</div>

			<div className="add-btn" onClick={() => setIsAddBoxVisible(true)}>
				Add Service
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Description</th>
							<th>Cover</th>
							<th>Sub-Services</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{services &&
							services.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.en.title}</td>
									<td>{item.en.description}</td>
									<td>
										<img alt={item.en.title} src={item.en.cover} />
									</td>
									<td>
										{item.en.subservices.map((item, index) => (
											<p>{index + 1 + "- " + item.title}</p>
										))}
									</td>
									<td className="action-btns">
										<button className="icon-btn" onClick={() => { console.log(item);deleteService(item._id) }}>
											<DeleteIcon />
										</button>
										<button className="icon-btn">
											<EditIcon />
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
							<h3>Add a new Service</h3>
							<div className="input-items">
								<div className="select-item">
									<select>
										<option value="">Select Parent</option>
										{services && services.map((item, index) => <option value={item._id}>{item.en.title}</option>)}
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
									<input
										placeholder="Cover url"
										type="text"
										value={serviceObj[activeLanguage].cover}
										onChange={(e) =>
											setServiceObj({
												...serviceObj,
												[activeLanguage]: { ...serviceObj[activeLanguage], cover: e.target.value },
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
								</div>
								<div className="btn-container">
									<button
										onClick={async () => {
											const service = await addService(serviceObj);
											service && setServices([...services, service]);
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
