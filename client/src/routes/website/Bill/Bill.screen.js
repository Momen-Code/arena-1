import React, { useState, useEffect } from "react";
import { FUNDING, PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";
import {
	MFSettings,
	MFPaymentRequest,
	MFCustomerAddress,
	MFExecutePaymentRequest,
	MFCardInfo,
	Response,
	MFSendPaymentRequest,
	MFLanguage,
	MFNotificationOption,
	MFPaymentype,
	MFMobileCountryCodeISO,
	MFCurrencyISO,
	MFPaymentStatusRequest,
	MFKeyType,
	MFInitiatePayment,
} from "myfatoorah-javascript";

//Hooks
import useBillHook from "./hooks/index";
import { useAppContext } from "../../../provider";

//Components
import { Header, Footer } from "../../../components";

//Style
import "./style.scss";
import { MdLocalPrintshop } from "react-icons/md";

const Bill = () => {
	const { getMyBill } = useBillHook();
	const { setIsLoading } = useAppContext();
	const { id } = useParams();
	const [bill, setBill] = useState({});
	const [paymentMethod, setPaymentMethod] = useState("");

	useEffect(() => {
		let baseURL = "https://apitest.myfatoorah.com";
		let token =
			"7Fs7eBv21F5xAocdPvvJ-sCqEyNHq4cygJrQUFvFiWEexBUPs4AkeLQxH4pzsUrY3Rays7GVA6SojFCz2DMLXSJVqk8NG-plK-cZJetwWjgwLPub_9tQQohWLgJ0q2invJ5C5Imt2ket_-JAlBYLLcnqp_WmOfZkBEWuURsBVirpNQecvpedgeCx4VaFae4qWDI_uKRV1829KCBEH84u6LYUxh8W_BYqkzXJYt99OlHTXHegd91PLT-tawBwuIly46nwbAs5Nt7HFOozxkyPp8BW9URlQW1fE4R_40BXzEuVkzK3WAOdpR92IkV94K_rDZCPltGSvWXtqJbnCpUB6iUIn1V-Ki15FAwh_nsfSmt_NQZ3rQuvyQ9B3yLCQ1ZO_MGSYDYVO26dyXbElspKxQwuNRot9hi3FIbXylV3iN40-nCPH4YQzKjo5p_fuaKhvRh7H8oFjRXtPtLQQUIDxk-jMbOp7gXIsdz02DrCfQIihT4evZuWA6YShl6g8fnAqCy8qRBf_eLDnA9w-nBh4Bq53b1kdhnExz0CMyUjQ43UO3uhMkBomJTXbmfAAHP8dZZao6W8a34OktNQmPTbOHXrtxf6DS-oKOu3l79uX_ihbL8ELT40VjIW3MJeZ_-auCPOjpE3Ax4dzUkSDLCljitmzMagH2X8jN8-AYLl46KcfkBV";
		MFSettings.sharedInstance.configure(baseURL, token);
		(async () => {
			setIsLoading(true);

			const bill = await getMyBill({ _id: id });
			setBill(bill);
			setIsLoading(false);
		})();
	}, []);

	const executeResquestJson = () => {
		let request = new MFExecutePaymentRequest(parseFloat("200"), "20");
		request.customerEmail = "a@b.com"; // must be email
		request.customerMobile = "";
		request.customerCivilId = "";
		let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
		request.customerAddress = address;
		request.customerReference = "";
		request.language = "en";
		request.mobileCountryCode = MFMobileCountryCodeISO.KUWAIT;
		request.displayCurrencyIso = MFCurrencyISO.KUWAIT_KWD;
		// var productList = []
		// var product = new MFProduct("ABC", 1.887, 1)
		// productList.push(product)
		// request.invoiceItems = productList
		return request;
	};
	const getCardInfo = () => {
		let cardExpiryMonth = "12";
		let cardExpiryYear = "25";
		let cardSecureCode = "300";
		let paymentType = MFPaymentype.CARD;
		// let paymentType = MFPaymentype.TOKEN
		let saveToken = false;
		let card = new MFCardInfo(
			"5453010000095539",
			cardExpiryMonth,
			cardExpiryYear,
			cardSecureCode,
			paymentType,
			saveToken
		);
		card.bypass = true;
		return card;
	};
	const executeDirectPayment = () => {
		let request = executeResquestJson();
		let cardInfo = getCardInfo();
		MFPaymentRequest.sharedInstance.executeDirectPayment(
			request,
			cardInfo,
			MFLanguage.ENGLISH,
			(response: Response) => {
				if (response.getError()) {
					alert("error: " + response.getError().error);
				} else {
					var bodyString = response.getBodyString();
					alert("success" + bodyString);
				}
			}
		);
	};

	return (
		<PayPalScriptProvider
			options={{
				"client-id": "AbmHNLMELToKbn7A3VxWDgqD_8b3ZbUUg6_5LgjbW4yJBQNF5Cep7a2wZ-XUvlUFw3w9dv6vg6vPfOTb",
				currency: "USD",
				intent: "capture",
			}}
		>
			<div className="bill-container">
				<Header />
				<div className="page-container">
					{bill.status == false ? (
						<div className="error-container">
							<div className="error-box">{bill.message}</div>
						</div>
					) : (
						<div className="bill-container">
							<div className="payment-methods">
								<h2>Payment</h2>
								<span className="dashed-line"></span>
								<p className="select-text">Please select a payment method:</p>
								<div className="payment-option">
									<label htmlFor="visa-master">
										<input
											id="visa-master"
											type="radio"
											checked={paymentMethod == "visa-master"}
											onChange={() => setPaymentMethod("visa-master")}
										/>
										VISA / MASTER
									</label>
								</div>
								<div className="payment-option">
									<label htmlFor="mada">
										<input
											id="mada"
											type="radio"
											checked={paymentMethod == "mada"}
											onChange={() => setPaymentMethod("mada")}
										/>
										MADA
									</label>
								</div>
								<div className="payment-option">
									<label htmlFor="apple-pay">
										<input
											id="apple-pay"
											type="radio"
											checked={paymentMethod == "apple-pay"}
											onChange={() => setPaymentMethod("apple-pay")}
										/>
										Apple Pay
									</label>
								</div>
								<div className="payment-option">
									<label htmlFor="stc-pay">
										<input
											id="stc-pay"
											type="radio"
											checked={paymentMethod == "stc-pay"}
											onChange={() => setPaymentMethod("stc-pay")}
										/>
										Sadad
									</label>
								</div>
								<div className="payment-option">
									<label htmlFor="paypal">
										<input
											id="paypal"
											type="radio"
											checked={paymentMethod == "paypal"}
											onChange={() => setPaymentMethod("paypal")}
										/>
										Paypal
									</label>
								</div>
								<div className={`payment-box ${paymentMethod == "paypal" ? "active" : ""}`}>
									<span>Click here to pay with paypal</span>
									<PayPalButtons
										style={{ layout: "horizontal" }}
										fundingSource={FUNDING.PAYPAL}
										createOrder={async (data, actions) =>
											actions.order.create({
												intent: "CAPTURE",
												purchase_units: [
													{
														description: "Test description of the order",
														amount: {
															value: "2.00",
															currency_code: "USD",
														},
													},
												],
											})
										}
										onApprove={async (data, actions) => {
											const order = await actions.order.capture();
											console.log(order);
											console.log(data, actions);
										}}
										onError={async (err) => console.log(err)}
									/>
								</div>
								<div className="pay-btn">
									<span>Click here to pay</span>
									<button className={paymentMethod != "" ? "" : "not-active"}>Pay 20700 SAR</button>
								</div>
							</div>

							<div className="payment-details">
								<div className="details-header">
									<h2>Details</h2>
									<MdLocalPrintshop size={34} color="#4b4b4b"className="print-icon"/>
								</div>
								<span className="dashed-line"></span>

								<table>
									<tr>
										<th>ID</th>
										<th>Description</th>
										<th>Quantity</th>
										<th>Price</th>
									</tr>
									<tr>
										<td>1</td>
										<td>
											Display stand-MDF 12mm 60x160, NC paint finish Acrylic projected letter, shelf strips, and footer
											plotter sticker
										</td>
										<td>20</td>
										<td>900 SAR</td>
									</tr>
									<tr>
										<td>1</td>
										<td>
											Display stand-MDF 12mm 60x160, NC paint finish Acrylic projected letter, shelf strips, and footer
											plotter sticker
										</td>
										<td>20</td>
										<td>900 SAR</td>
									</tr>
									<tr>
										<td className="borderless"></td>
										<td className="borderless"></td>
										<td className="bold">VAT 15%</td>
										<td className="bold">2700 SAR</td>
									</tr>
									<tr>
										<td className="borderless"></td>
										<td className="borderless"></td>
										<td className="bold">Total with Vat 15%</td>
										<td className="bold">20700 SAR</td>
									</tr>
								</table>
							</div>
						</div>
					)}
				</div>

				<Footer />
			</div>
		</PayPalScriptProvider>
	);
};

export default Bill;
