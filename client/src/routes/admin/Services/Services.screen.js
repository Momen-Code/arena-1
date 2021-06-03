import { useState, useEffect } from "react";
//Hooks
import useHooks from "../hooks";
import { useOnClickOutside } from "../../../hooks";

//Style
import "./style.scss";

//Components
import { NavBar, FloatingBox } from "../../../components";

//Assets
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const Services = () => {
	const { getServices } = useHooks();
	const [services, setServices] = useState([]);
	const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
	const [numOfSubService, setNumOfSubServices] = useState(1);

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
						</tr>
					</thead>
					<tbody>
						{services &&
							services.map((item, index) => (
								<tr key={index}>
									<td>{item._id}</td>
									<td>{item.title}</td>
									<td>{item.description}</td>
									<td className="action-btns">
										<button className="icon-btn">
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
									</select>
									<span></span>
								</div>
								<div className="input-item">
									<input placeholder="Title" type="text" />
								</div>
								<div className="input-item">
									<input placeholder="Slug" type="text" />
								</div>
								<div className="input-item">
									<input placeholder="Cover url" type="text" />
								</div>
								<div className="input-item">
									<textarea placeholder="Description"></textarea>
								</div>

								<div className="btn-container">
									<button>Save </button>
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
