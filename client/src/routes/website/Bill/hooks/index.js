import axios from "axios";
import { useAppContext } from "../../../../provider";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useProjectsHook = () => {
	const { createNotification, setIsLoading } = useAppContext();
	const history = useHistory();
	const { i18n } = useTranslation("translations");

	const getMyBill = async ({ _id }) => {
		try {
			let response = await axios.post("/api/bills/mybill", { _id }, { headers: { "Accept-Language": i18n.language } });
			let data = await response.data;

			console.log(data);
			if (!data.status) {
				// createNotification(data.message, "error");
				return data;
			}
			// createNotification(data.message, "success");
			return data;
		} catch (e) {
			alert(e.message);
		}
	};

	return { getMyBill };
};

export default useProjectsHook;
