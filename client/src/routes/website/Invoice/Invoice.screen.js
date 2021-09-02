import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Hooks
import useInvoiceHook from "./hooks/index";
import { useAppContext } from "../../../provider";

//Components
import { Header, Footer } from "../../../components";

//Style
import "./style.scss";
import { MdLocalPrintshop } from "react-icons/md";

const Bill = () => {
  const { getMyInvoice, payInvoice } = useInvoiceHook();
  const { t, i18n } = useTranslation("translations");
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [paymentMethod, setPaymentMethod] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getMyInvoice({ _id: id });
      if (data && data.status) {
        setInvoice(data.data);
      } else if (data && !data.status) {
        setError(data.message);
      }
    })();
  }, []);

  if (!!error)
    return (
      <div
        className="invoice-container"
        style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
      >
        <Header />
        <div className="page-container">
          <div className="error-container">
            <div className="error-box">{error}</div>
          </div>
        </div>
        <Footer />
      </div>
    );

  return (
    <div
      className="invoice-container"
      style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
    >
      <Header />
      <div className="page-container">
        <div className="invoice-container">
          <div className="payment-methods">
            <h2>Payment</h2>
            <span className="dashed-line"></span>
            <p className="select-text">Please select a payment method:</p>
            {invoice.paymentMethods &&
              invoice.paymentMethods.map((payment, i) => (
                <div className="payment-option" key={i}>
                  <label htmlFor={payment.PaymentMethodEn}>
                    <input
                      id={payment.PaymentMethodEn}
                      type="radio"
                      checked={paymentMethod == payment.PaymentMethodId}
                      onChange={() => setPaymentMethod(payment.PaymentMethodId)}
                    />
                    {i18n.language == "en"
                      ? payment.PaymentMethodEn
                      : payment.PaymentMethodAr}
                  </label>
                </div>
              ))}

            <div className="pay-btn">
              <span>Click here to pay</span>
              <button
                className={!!!paymentMethod ? "not-active" : ""}
                onClick={() =>
                  paymentMethod && payInvoice({ _id: id, paymentMethod })
                }
              >
                {!!!paymentMethod
                  ? "Select a payment method first"
                  : `Pay 
                ${
                  invoice.InvoiceItems &&
                  (
                    invoice.InvoiceItems.reduce(
                      (acc, curr) => curr.Quantity * curr.UnitPrice + acc,
                      0
                    ) * 1.15
                  ).toFixed(2)
                }
                SAR`}
              </button>
            </div>
          </div>

          <div className="payment-details">
            <div className="details-header">
              <h2>Details</h2>
              <MdLocalPrintshop
                size={34}
                color="#4b4b4b"
                className="print-icon"
              />
            </div>
            <span className="dashed-line"></span>

            <table>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              {invoice.InvoiceItems &&
                invoice.InvoiceItems.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.ItemName}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.UnitPrice} SAR</td>
                    <td>{item.UnitPrice * item.Quantity} SAR</td>
                  </tr>
                ))}
              <tr>
                <td className="borderless"></td>
                <td className="borderless"></td>
                <td className="bold">VAT 15%</td>
                <td className="bold">
                  {invoice.InvoiceItems &&
                    invoice.InvoiceItems.reduce(
                      (acc, curr) => curr.Quantity * curr.UnitPrice + acc,
                      0
                    )}{" "}
                  SAR
                </td>
              </tr>
              <tr>
                <td className="borderless"></td>
                <td className="borderless"></td>
                <td className="bold">Total with Vat 15%</td>
                <td className="bold">
                  {invoice.InvoiceItems &&
                    (
                      invoice.InvoiceItems.reduce(
                        (acc, curr) => curr.Quantity * curr.UnitPrice + acc,
                        0
                      ) * 1.15
                    ).toFixed(2)}{" "}
                  SAR
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
