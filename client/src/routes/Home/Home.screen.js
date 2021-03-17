//Components
import { Header } from "../../components";

//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../assets/img/circle-shape-primary.png";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="left-wrapper">
        <div className="info-text">
          Cynicism is something that is part of the media production of a
          certain type of subjectivity or consciousness that is passive and{" "}
          <span>disempowered</span>, cynical, fatalistic, pessimistic
        </div>
      </div>
      <div className="right-wrapper">
        <img className="circle-img" src={CircleShape} alt="" />
      </div>
    </div>
  );
};

export default Home;
