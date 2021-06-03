import { useState, useEffect } from "react";
import useHooks from "../hooks";
//Style
import "./style.scss";

//Components
import { NavBar } from "../../../components";

//Assets
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const Services = () => {
	const { getServices } = useHooks();
	const [services, setServices] = useState([]);

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

			<div className="add-btn">Add Service</div>
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
						{services.map((item, index) => (
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
		</div>
	);
};

export default Services;
