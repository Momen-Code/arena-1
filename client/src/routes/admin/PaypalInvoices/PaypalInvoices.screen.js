import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAppContext } from "../../../provider";

//Hooks
import useInvoiceHook from "./hooks";
import { useOnClickOutside } from "../../../hooks";

//Style
import "./style.scss";

//Components
import { NavBar } from "../../../components";

//Assets
// @ts-ignore
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete-icon.svg";
// @ts-ignore
import { ReactComponent as EditIcon } from "../../../assets/img/edit-icon.svg";

const Invoices = () => {
	const { getInvoices, addInvoice, deleteInvoice, sendInvoice, remindClient, cancelInvoice } = useInvoiceHook();
	const { userData } = useAppContext();
	const [invoices, setInvoices] = useState([]);
	const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
	const defaultInvoiceObj = {
		clientEmail: "",
		firstName: "",
		lastName: "",
		description: "",
		amount: "",
	};

	const [invoiceObj, setInvoiceObj] = useState(defaultInvoiceObj);

	const addBoxRef = useOnClickOutside(() => {
		setIsAddBoxVisible(false);
		setInvoiceObj(defaultInvoiceObj);
	});

	useEffect(() => {
		(async () => {
			setInvoices(await getInvoices());
		})();
	}, []);

	return (
		<div className="invoices-container">
			{userData.role != "administrator" && <Redirect to="/admin/projects" />}
			<div className="navbar-container">
				<NavBar />
			</div>

			<div className="add-btn" onClick={() => setIsAddBoxVisible(true)}>
				Create Invoice
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Client Name</th>
							<th>Client Email</th>
							<th>Invoice Number</th>
							<th>Amount</th>
							<th>Date Issued</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{invoices &&
							invoices.map((item, index) => (
								<tr key={index}>
									<td>{invoices.length - index}</td>
									<td>{item.billing_info[0].first_name + " " + item.billing_info[0].last_name}</td>
									<td>{item.billing_info[0].email}</td>
									<td>{item.number}</td>
									<td>{item.total_amount.value + " " + item.total_amount.currency}</td>
									<td>
										{new Intl.DateTimeFormat("en-US", {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
										}).format(Date.parse(item.metadata.created_date))}
									</td>
									<td>{item.status}</td>
									<td className="action-btns">
										{item.status == "DRAFT" && (
											<>
												<button
													onClick={async () => {
														(await sendInvoice(item.id)) && setInvoices(await getInvoices());
													}}
												>
													Send
												</button>
												<button
													className="icon-btn"
													onClick={async () => {
														(await deleteInvoice(item.id)) && setInvoices(await getInvoices());
													}}
												>
													<DeleteIcon />
												</button>
											</>
										)}
										{["UNPAID", "SENT"].includes(item.status) && (
											<>
												<button title={item.metadata.payer_view_url} onClick={() => remindClient(item.id)}>
													Remind Client
												</button>
												<button
													title={item.metadata.payer_view_url}
													onClick={() => window.open(item.metadata.payer_view_url, "_blank")}
												>
													Open Invoice Url
												</button>
												<button
													style={{ background: "red" }}
													title={item.metadata.payer_view_url}
													onClick={async () => (await deleteInvoice(item.id)) && setInvoices(await getInvoices())}
												>
													Cancel Invoice
												</button>
											</>
										)}
										{item.status == "PAID" && <button onClick={() => null}>Refund Money</button>}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{isAddBoxVisible && (
				<div className="floating-box-container">
					<div className="data-box" ref={addBoxRef}>
						<div className="closing" onClick={() => setIsAddBoxVisible(false)}>
							<span></span>
							<span></span>
						</div>
						<form onSubmit={(e) => e.preventDefault()}>
							<h3>Create an Invoice</h3>
							<div className="input-items">
								<div className="input-item">
									<input
										placeholder="Client's Email"
										type="email"
										value={invoiceObj.clientEmail}
										onChange={(e) =>
											setInvoiceObj({
												...invoiceObj,
												clientEmail: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-item">
									<input
										placeholder="First Name"
										type="text"
										value={invoiceObj.firstName}
										onChange={(e) =>
											setInvoiceObj({
												...invoiceObj,
												firstName: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-item">
									<input
										placeholder="Last Name"
										type="text"
										value={invoiceObj.lastName}
										onChange={(e) =>
											setInvoiceObj({
												...invoiceObj,
												lastName: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-item">
									<input
										placeholder="Invoice Description"
										type="text"
										value={invoiceObj.description}
										onChange={(e) =>
											setInvoiceObj({
												...invoiceObj,
												description: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-item">
									<input
										placeholder="Amount in USD"
										type="text"
										value={invoiceObj.amount}
										onChange={(e) =>
											setInvoiceObj({
												...invoiceObj,
												amount: e.target.value,
											})
										}
									/>
								</div>
								<div className="btn-container">
									<button
										onClick={async () => {
											const invoice = await addInvoice(invoiceObj);
											if (invoice) {
												setInvoices([invoice, ...invoices]);
												setIsAddBoxVisible(false);
											}
										}}
									>
										Create Invoice
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Invoices;
