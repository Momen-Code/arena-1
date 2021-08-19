import axios from "axios";
import { useAppContext } from "../../../../provider";
import { useTranslation } from "react-i18next";

const useInvoiceHook = () => {
  const { setIsLoading, createNotification } = useAppContext();
  const { i18n } = useTranslation("translations");

  const getMyInvoice = async ({ _id }) => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        "/api/invoices/myinvoice",
        { _id },
        { headers: { "Accept-Language": i18n.language } }
      );
      let data = await response.data;

      console.log(data);

      return data;
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const payInvoice = async ({ _id, paymentMethod }) => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        "/api/invoices/pay",
        { _id, PaymentMethodId: paymentMethod },
        { headers: { "Accept-Language": i18n.language } }
      );
      let data = await response.data;
      if (!data.status) {
        return createNotification(data.message);
      }

      //Redirect to the payment url
      if (data.data.PaymentURL) {
        window.location.replace(data.data.PaymentURL);
      } else {
        createNotification("Something went wrong");
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { getMyInvoice, payInvoice };
};

export default useInvoiceHook;
