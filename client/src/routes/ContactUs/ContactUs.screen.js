//Components
import { Header } from "../../components";
//Style
import "./style.scss";

//Assets
// @ts-ignore
import CircleShape from "../../assets/img/circle-shape-gray.png";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <Header />
      <div className="info-container">
        <div className="contact-txt">Contact</div>
        <div className="info-wrapper">
          <img className="circle-img" src={CircleShape} alt="" />
          <div className="us-txt">Us</div>
          <div className="information">
            <div>5 , YAHIA STREET , GLEEM , ALEXANDRIA</div>
            <div>+201065157968</div>
            <div>0324567859</div>
            <div>FOR QUIESTIONS {"&"} COMPLAINS</div>
            <div>CONTACT US AT</div>
            <div>ARENA.WORK@AR.COM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
