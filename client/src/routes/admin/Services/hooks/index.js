import axios from "axios";
import { useAppContext, useAuthContext } from "../../../../provider";

const useServiceHook = () => {
	const { createNotification, setIsLoading } = useAppContext();
	const { setIsLoggedIn } = useAuthContext();

	const getServices = async () => {
		try {
			setIsLoading(true);

			let response = await axios.post("/api/services/get");
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

	const addService = async (serviceObj) => {
		try {
			setIsLoading(true);
			let response = await axios.post("/api/services/create", serviceObj);
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

	const deleteService = async (_id) => {
		try {
			if (!window.confirm("Are you sure to delete this service & it's sub-services ?")) {
				return false;
			}

			setIsLoading(true);
			let response = await axios.post("/api/services/delete", { _id });
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

	return { getServices, addService, deleteService };
};

export default useServiceHook;
