import axios from "axios";
import { useAppContext } from "../../../../provider";

const useUserHook = () => {
	const { createNotification, setIsLoading } = useAppContext();

	const getUsers = async () => {
		try {
			setIsLoading(true);

			let response = await axios.post("/api/users/get");
			let data = await response.data;

			console.log(data);
			if (!data.status) {
				createNotification(data.message, "error");
				return [];
			}
			// createNotification(data.message, "success");
			return data.data;
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const addUser = async (userObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/users/add", userObj);
			let data = await response.data;

			console.log(data);
			if (!data.status) {
				createNotification(data.message, "error");
				return false;
			}
			createNotification(data.message, "success");
			return data.data;
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const editUser = async (userObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/users/edit", userObj);
			let data = await response.data;

			console.log(data);
			if (!data.status) {
				createNotification(data.message, "error");
				return false;
			}
			createNotification(data.message, "success");
			return data.data;
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteUser = async (_id) => {
		try {
			if (!window.confirm("Are you sure to delete this user ?")) {
				return false;
			}

			setIsLoading(true);
			let response = await axios.post("/api/users/delete", { _id });
			let data = await response.data;

			console.log(data);
			if (!data.status) {
				createNotification(data.message, "error");
				return false;
			}
			createNotification(data.message, "success");
			return true;
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { getUsers, addUser, deleteUser, editUser };
};

export default useUserHook;
