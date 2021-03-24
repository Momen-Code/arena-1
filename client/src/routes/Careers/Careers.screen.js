//Components
import { Header, Footer } from "../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../assets/img/circle-shape-primary.png";

const Careers = () => {
  return (
    <div className="careers-container">
      <Header />
      <div className="page-container">
        <div className="content-container">
          <h3>
            Our people are our pride. Join the team and help us build a global
            company
            <br /> that is revolutionizing the mobile ecosystem
          </h3>
          <img className="circle-img" src={CircleShape} alt="" />
          <button className="all-jobs-btn">All Jobs</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
