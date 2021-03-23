import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//Routes
import {
  Home,
  WhoWeAre,
  ContactUs,
  Services,
  Portfolio,
  SideMenu,
} from "./routes";

//Components
import { Header } from "./components";
//Style
import "./assets/style/_global.scss";

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container" data-test="hello">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route exact path="/who-we-are" component={WhoWeAre} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/our-services" component={Services} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/menu" component={SideMenu} />
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default App;
