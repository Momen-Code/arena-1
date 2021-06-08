import axios from "axios";
import { useAppContext, useAuthContext } from "../../../../provider";

const useProjectHook = () => {
	const { createNotification, setIsLoading } = useAppContext();
	const { setIsLoggedIn } = useAuthContext();

	const getProjects = async () => {
		try {
			setIsLoading(true);

			let response = await axios.post("/api/projects/get");
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

	const addProject = async (projectObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/projects/create", projectObj);
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

	const editProject = async (projectObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/projects/edit", projectObj);
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
	const changeIndex = async ({ firstId, secondId }) => {
		try {
			console.log({ firstId, secondId });
			setIsLoading(true);
			let response = await axios.post("/api/projects/changeIndex", { firstId, secondId });
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

	const deleteProject = async (_id) => {
		try {
			if (!window.confirm("Are you sure to delete this project ?")) {
				return false;
			}

			setIsLoading(true);
			let response = await axios.post("/api/projects/delete", { _id });
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

	return { getProjects, addProject, deleteProject, editProject, changeIndex };
};

export default useProjectHook;
