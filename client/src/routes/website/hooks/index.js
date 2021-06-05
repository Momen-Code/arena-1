import axios from "axios";
import { useAppContext } from "../../../provider";
import { useHistory } from "react-router-dom";

const useProjectsHook = () => {
	const { createNotification, setIsLoading } = useAppContext();
	const history = useHistory();

	const getProjects = async ({ slug = "" }) => {
		try {
			setIsLoading(true);

			let response = await axios.post("/api/projects/get", { slug });
			let data = await response.data;

			console.log(data);
			if (!data.status) {
				createNotification(data.message, "error");
				history.push("/404");
				return {};
			}
			// createNotification(data.message, "success");
			return data.data;
		} catch (e) {
			alert(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { getProjects };
};

export default useProjectsHook;
