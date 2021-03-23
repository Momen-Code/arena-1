//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../../../assets/img/circle-shape-gray.png";

const GetQuotePaper = () => {
  return (
    <div className="get-quote-paper-container">
      <div className="left-container">
        <h1>GET</h1>
        <h1>
          A <img className="circle-img" src={CircleShape} alt="" />
        </h1>
        <h1>QUOTE</h1>
      </div>
      <div className="right-container">
        <div className="input-items">
          <div className="input-item">
            <label>First Name :-</label>
            <input type="text" />
          </div>
          <div className="input-item">
            <label>Last Name :-</label>
            <input type="text" />
          </div>
          <div className="input-item">
            <label>Email :-</label>
            <input type="text" style={{ textTransform: "lowercase" }} />
          </div>
          <div className="input-item">
            <label>Phone :-</label>
            <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
          </div>
          <div className="input-item">
            <label>Company Name :-</label>
            <input type="text" />
          </div>
          <div className="input-item">
            <label>Budget :-</label>
            <input type="text" />
          </div>
          <div className="input-item">
            <label>Write An Estimation :-</label>
            <input type="text" />
          </div>
          <div
            className="input-item"
            style={{ flexDirection: "column", marginBottom: 20 }}
          >
            <label>What Service Do You Need :-</label>
            <textarea />
          </div>
          <div className="input-item">
            <button className="submit-btn">Done</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuotePaper;
