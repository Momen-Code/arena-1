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

	const addProject = async (serviceObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/projects/create", serviceObj);
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

	const editProject = async (serviceObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/projects/edit", serviceObj);
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

	const deleteProject = async (_id) => {
		try {
			if (!window.confirm("Are you sure to delete this service & it's sub-projects ?")) {
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
			return data.data;
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { getProjects, addProject, deleteProject, editProject };
};

export default useProjectHook;
