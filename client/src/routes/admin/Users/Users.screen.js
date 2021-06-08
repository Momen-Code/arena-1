import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAppContext } from "../../../provider";

//Hooks
import useUserHook from "./hooks";
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

const Users = () => {
	const { getUsers, addUser, deleteUser, editUser } = useUserHook();
	const { userData } = useAppContext();
	const [users, setUsers] = useState([]);
	const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const defaultUserObj = {
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
		role: "",
	};

	const [userObj, setUserObj] = useState(defaultUserObj);

	const addBoxRef = useOnClickOutside(() => {
		setIsAddBoxVisible(false);
		setIsEditMode(false);
		setUserObj(defaultUserObj);
	});

	useEffect(() => {
		(async () => {
			setUsers(await getUsers());
		})();
	}, []);

	return (
		<div className="users-container">
			{userData.role != "administrator" && <Redirect to="/admin/projects" />}
			<div className="navbar-container">
				<NavBar />
			</div>

			<div className="add-btn" onClick={() => setIsAddBoxVisible(true)}>
				Add User
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.username}</td>
									<td>{item.email}</td>
									<td>{item.role}</td>
									<td className="action-btns">
										<button
											className="icon-btn"
											onClick={() => {
												setUserObj(item);
												setIsEditMode(true);
												setIsAddBoxVisible(true);
											}}
										>
											<EditIcon />
										</button>
										<button
											className="icon-btn"
											onClick={async () => {
												(await deleteUser(item._id)) && setUsers(await getUsers());
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
							<h3>{isEditMode ? "Edit User" : "Add a new User"}</h3>
							<div className="input-items">
								<div className="select-item">
									<select
										onChange={(e) => setUserObj({ ...userObj, role: e.target.value })}
										value={userObj.type}
									>
										<option value="">Select Role</option>
										<option value="administrator">Administrator</option>
										<option value="user">User</option>

									</select>
									<span></span>
								</div>
								<div className="input-item">
									<input
										placeholder="Username"
										type="text"
										value={userObj.username}
										onChange={(e) =>
											setUserObj({
												...userObj,
												username: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-item">
									<input
										placeholder="Email"
										type="email"
										value={userObj.email}
										onChange={(e) =>
											setUserObj({
												...userObj,
												email: e.target.value,
											})
										}
									/>
								</div>
								{!isEditMode && (
									<>
										<div className="input-item">
											<input
												placeholder="Password"
												type="password"
												value={userObj.password}
												onChange={(e) =>
													setUserObj({
														...userObj,
														password: e.target.value,
													})
												}
											/>
										</div>
										<div className="input-item">
											<input
												placeholder="Confirm Password"
												type="password"
												value={userObj.passwordConfirm}
												onChange={(e) =>
													setUserObj({
														...userObj,
														passwordConfirm: e.target.value,
													})
												}
											/>
										</div>
									</>
								)}
								<div className="btn-container">
									<button
										onClick={async () => {
											if (!isEditMode) {
												const user = await addUser(userObj);
												if (user) {
													setUsers([...users, user]);
													setIsAddBoxVisible(false);
												}
											} else {
												const user = await editUser(userObj);
												if (user) {
													setUsers([...users, user]);
													setIsAddBoxVisible(false);
													setUserObj(defaultUserObj);
													setUsers(await getUsers());
													setIsEditMode(false);
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

export default Users;
