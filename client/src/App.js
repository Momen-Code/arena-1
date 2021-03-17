import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routes
import { Home, WhoWeAre,ContactUs, Services } from "./routes";

//Style
import "./assets/style/_global.scss";

const App = () => {
  return (
    <div className="app-container" data-test="hello">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/who-we-are" component={WhoWeAre} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/our-services" component={Services} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
