//Components
import { Header } from "../../components";

//Style
import "./style.scss";

const Portfolio = () => {
  return (
    <div className="services-container">
      <Header />
      <div className="left-wrapper">
        <div className="our-services-txt">
          Our
          <br />
          Portfolio
        </div>
      </div>
      <div className="right-wrapper">
        <div className="services-grid">
          <div className="service-box">
            <h1 className="title">Printing</h1>
          </div>
          <div className="service-box">
            <h1 className="title">Marketing</h1>
          </div>
          <div className="service-box">
            <h1 className="title">Interior</h1>
          </div>
          <div className="service-box">
            <h1 className="title">Branding</h1>
          </div>
          <div className="service-box">
            <h1 className="title">Exterior</h1>
          </div>
          <div className="service-box">
            <h1 className="title">Other..</h1>
          </div>
        </div>

        <div className="vertical-content">
          Everything we make must meet our three experience principles: smart,
          simple and human. While these never <span>budge</span>, we are proudly
          flexible in our process; continually adapting our methods to meet the
          specific challenges of each <span>project</span>.
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
