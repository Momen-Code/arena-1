//Components
import { Header } from "../../components";
//Style
import "./style.scss";

const WhoWeAre = () => {
  return (
    <div className="who-we-are-container">
      <Header />
      <div className="left-wrapper"></div>
      <div className="right-wrapper">
        <div className="whoweare-big">
          <span>Who</span>
          <span>We</span>
          <span>Are</span>
        </div>
        <div className="vertical-content">
          <div>
            We design digital products that go beyond pure functionality and
            usability to evoke trust, joy and brand loyalty. Since 2003 we've
            been honing our craft as UX and UI specialists.
          </div>
          <div>
            Sennep means mustard. Our secret sauce is adding a kick to the bland
            sandwiches of the digital world – raising smiles as well as the
            bottom line.
          </div>
          <div>
            Everything we make must meet our three experience principles: smart,
            simple and human. While these never budge, we are proudly flexible
            in our process; continually adapting our methods to meet the
            specific challenges of each project.
          </div>
        </div>
      </div>
      <div className="circle-shape"></div>
    </div>
  );
};

export default WhoWeAre;
