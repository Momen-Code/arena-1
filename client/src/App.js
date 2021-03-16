import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routes
import { Home, WhoWeAre } from "./routes";

//Style
import "./assets/style/_global.scss";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/who-we-are" component={WhoWeAre} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
