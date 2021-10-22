import axios from "axios";
import { useAppContext } from "../../../../provider";

const useInvoiceHook = () => {
  const { createNotification, setIsLoading } = useAppContext();

  const getInvoices = async () => {
    try {
      setIsLoading(true);

      let response = await axios.post("/api/invoices/all");
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

  const createInvoice = async (invoiceObj) => {
    try {
      setIsLoading(true);
      let response = await axios.post("/api/invoices/create", invoiceObj);
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

  const sendInvoice = async (invoiceId) => {
    try {
      if (!window.confirm("Are you sure you want to resend this invoice ?")) {
        return false;
      }
      setIsLoading(true);
      let response = await axios.post("/api/invoices/send", { invoiceId });
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

  // const deleteInvoice = async (invoiceId) => {
  // 	try {
  // 		if (!window.confirm("Are you sure to delete this invoice ?")) {
  // 			return false;
  // 		}

  // 		setIsLoading(true);
  // 		let response = await axios.post("/api/invoices/delete", { invoiceId });
  // 		let data = await response.data;

  // 		console.log(data);
  // 		if (!data.status) {
  // 			createNotification(data.message, "error");
  // 			return false;
  // 		}
  // 		createNotification(data.message, "success");
  // 		return true;
  // 	} catch (e) {
  // 		alert(e.message);
  // 	} finally {
  // 		setIsLoading(false);
  // 	}
  // };

  const remindClient = async (invoiceId) => {
    try {
      if (!window.confirm("Do you want to send a reminder to the client ?")) {
        return false;
      }

      setIsLoading(true);
      let response = await axios.post("/api/invoices/remind", { invoiceId });
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

  const cancelInvoice = async (invoiceId) => {
    try {
      if (!window.confirm("Do you want to cancel this invoice ?")) {
        return false;
      }

      setIsLoading(true);
      let response = await axios.post("/api/invoices/cancel", { _id: invoiceId });
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

  const editInvoice = async (invoiceObj) => {
    try {
      setIsLoading(true);
      let response = await axios.post("/api/invoices/edit", invoiceObj);
      let data = await response.data;

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

  return {
    getInvoices,
    createInvoice,
    // deleteInvoice,
    sendInvoice,
    remindClient,
    cancelInvoice,
    editInvoice,
  };
};

export default useInvoiceHook;
