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
  const { getInvoices, createInvoice, remindClient, cancelInvoice } =
    useInvoiceHook();
  const { userData } = useAppContext();
  const [invoices, setInvoices] = useState([]);
  const [isAddBoxVisible, setIsAddBoxVisible] = useState(false);
  const defaultInvoiceObj = {
    email: "",
    CustomerName: "",
    referenceId: "",
    InvoiceItems: [
      {
        ItemName: "",
        Quantity: 1,
        UnitPrice: 1,
      },
    ],
  };

  const [invoiceObj, setInvoiceObj] = useState(defaultInvoiceObj);

  const addBoxRef = useOnClickOutside(() => {
    setIsAddBoxVisible(false);
    setInvoiceObj(defaultInvoiceObj);
  });

  useEffect(() => {
    (async () => {
      const invoices = await getInvoices();
      if (invoices) setInvoices(invoices.reverse());
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
              <th>Reference ID</th>
              <th>Total Amount</th>
              <th>With 15% Vat</th>
              <th>Items</th>
              <th>Quantity x Price</th>
              <th>Date Issued</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.CustomerName}</td>
                  <td>{item.email}</td>
                  <td>{item.referenceId}</td>
                  <td>{item.InvoiceValue + " " + item.DisplayCurrencyIso}</td>
                  <td>
                    {(item.InvoiceValue * 1.15).toFixed(2) +
                      " " +
                      item.DisplayCurrencyIso}
                  </td>
                  <td>
                    {item.InvoiceItems.map((subItem) => (
                      <p>• {subItem.ItemName}</p>
                    ))}
                  </td>
                  <td>
                    {item.InvoiceItems.map((subItem) => (
                      <p>
                        {subItem.Quantity +
                          " x " +
                          subItem.UnitPrice +
                          " " +
                          item.DisplayCurrencyIso}
                      </p>
                    ))}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(Date.parse(item.createDate))}
                  </td>
                  <td>{item.status}</td>
                  <td className="action-btns">
                    {item.status == "unpaid" && (
                      <>
                        <button
                          title={
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            "/pay-invoice/" +
                            item._id
                          }
                          onClick={() =>
                            window.open(
                              window.location.protocol +
                                "//" +
                                window.location.host +
                                "/pay-invoice/" +
                                item._id,
                              "_blank"
                            )
                          }
                        >
                          Open Invoice
                        </button>
                        <button
                          style={{ background: "red" }}
                          onClick={async () =>
                            (await cancelInvoice(item._id)) &&
                            setInvoices(await getInvoices())
                          }
                        >
                          Cancel Invoice
                        </button>
                      </>
                    )}
                    {/* {item.status == "PAID" && (
                      <button onClick={() => null}>Refund Money</button>
                    )} */}
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
                    placeholder="Client Email"
                    type="email"
                    value={invoiceObj.email}
                    onChange={(e) =>
                      setInvoiceObj({
                        ...invoiceObj,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-item">
                  <input
                    placeholder="Client Name"
                    type="text"
                    value={invoiceObj.CustomerName}
                    onChange={(e) =>
                      setInvoiceObj({
                        ...invoiceObj,
                        CustomerName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-item">
                  <input
                    placeholder="Reference ID"
                    type="text"
                    value={invoiceObj.referenceId}
                    onChange={(e) =>
                      setInvoiceObj({
                        ...invoiceObj,
                        referenceId: e.target.value,
                      })
                    }
                  />
                </div>
                {invoiceObj.InvoiceItems.map((item, index, InvoiceItems) => (
                  <>
                    <span className="line">
                      <hr />
                    </span>
                    <div
                      key={index}
                      className="input-item"
                      style={{ display: "flex" }}
                    >
                      <input
                        placeholder={`Item ${index + 1} Description`}
                        type="text"
                        value={item.ItemName}
                        onChange={(e) => {
                          InvoiceItems[index].ItemName = e.target.value;
                          setInvoiceObj({
                            ...invoiceObj,
                            InvoiceItems,
                          });
                        }}
                      />
                      <div className="btn-container">
                        {index == 0 ? (
                          <button
                            className="plus-btn"
                            onClick={() => {
                              setInvoiceObj({
                                ...invoiceObj,
                                InvoiceItems: [
                                  ...InvoiceItems,
                                  { ItemName: "", Quantity: 1, UnitPrice: 1 },
                                ],
                              });
                            }}
                          >
                            +
                          </button>
                        ) : (
                          <button
                            className="plus-btn"
                            onClick={() => {
                              InvoiceItems.splice(index, 1);
                              setInvoiceObj({
                                ...invoiceObj,
                                InvoiceItems,
                              });
                            }}
                          >
                            -
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="input-item" style={{ marginTop: 0 }}>
                        <span style={{ color: "#707070" }}>Quantity</span>
                        <input
                          placeholder="Quantity"
                          type="number"
                          value={item.Quantity}
                          min={1}
                          style={{ textAlign: "center" }}
                          onChange={(e) => {
                            InvoiceItems[index].Quantity = Number(
                              e.target.value
                            );
                            setInvoiceObj({
                              ...invoiceObj,

                              InvoiceItems,
                            });
                          }}
                        />
                      </div>
                      <div style={{ width: 40 }}></div>
                      <div className="input-item" style={{ marginTop: 0 }}>
                        <span style={{ color: "#707070" }}>Price per unit</span>
                        <input
                          placeholder="Price per unit"
                          type="number"
                          style={{ textAlign: "center" }}
                          value={item.UnitPrice}
                          min={1}
                          onChange={(e) => {
                            InvoiceItems[index].UnitPrice = Number(
                              e.target.value
                            );
                            setInvoiceObj({
                              ...invoiceObj,

                              InvoiceItems,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </>
                ))}
                {/* <div className="input-item">
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
                </div> */}
                <div className="btn-container">
                  <button
                    onClick={async () => {
                      const invoice = await createInvoice(invoiceObj);
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
