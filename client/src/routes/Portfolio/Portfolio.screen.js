//Components
import { Header } from "../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../assets/img/circle-shape-primary.png";
// @ts-ignore
import { ReactComponent as TriangleIcon } from "../../assets/img/triangle-icon.svg";

const Services = () => {
  return (
    <div className="portfolio-container">
      <Header />
      <div className="left-wrapper">
        <div className="our-portfolio-txt">
          Our
          <br />
          Portfolio
        </div>
      </div>
      <div className="right-wrapper">
        <img className="circle-img" src={CircleShape} alt="" />

        <div className="portfolio-grid">
          <div className="portfolio-box">
            <h1 className="title">Project 01</h1>
          </div>
          <div className="portfolio-box">
            <h1 className="title">Project 02</h1>
          </div>
          <div className="portfolio-box">
            <h1 className="title">Project 03</h1>
          </div>
          <div className="portfolio-box">
            <h1 className="title">Project 04</h1>
          </div>
          <div className="triangle-shape"/>
        </div>

        <div className="vertical-content">
          Everything we make must meet our three experience principles: smart,
          simple and human. While these never <span>budge</span>, we are proudly
          flexible in our process; continually adapting our methods to meet the
          specific challenges of each <span>project</span>.
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

export default Services;
