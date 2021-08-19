import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "./provider";

//Routes
import {
  Home,
  WhoWeAre,
  ContactUs,
  Services,
  ServicePage,
  Projects,
  ProjectPage,
  SideMenu,
  Careers,
  Login,
  ResetPassword,
  UsersAdmin,
  ServicesAdmin,
  ProjectsAdmin,
  PaypalInvoicesAdmin,
  Invoice,
  Page404,
} from "./routes";

//Components
import { Loader } from "./components";

//Style
import "./assets/style/_global.scss";
import "./assets/style/rtl.scss";
import "react-notifications/lib/notifications.css";

const App = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    //Localization
    const body = document.getElementsByTagName("body")[0];
    const root = document.getElementById("root");
    const container = document.querySelector(".app-container");
    if (i18n.language == "ar") {
      body.classList.add("rtl-layout");
      body.dir = "ltr";
    } else {
      body.classList.remove("rtl-layout");
      body.dir = "rtl";
    }
    i18n.on("languageChanged", (lang) => {
      window.location.reload();
    });

    //Paypal
  }, []);

  return (
    <div className="app-container" data-test="hello">
      <Loader />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route exact path="/who-we-are" component={WhoWeAre} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/our-services/:service" component={ServicePage} />
          <Route path="/our-services" component={Services} />
          <Route exact path="/projects/:project" component={ProjectPage} />
          <Route path="/projects" component={Projects} />
          <Route exact path="/menu" component={SideMenu} />
          <Route exact path="/careers" component={Careers} />
          <Route exact path="/pay-invoice/:id" component={Invoice} />
          <Route
            exact
            path="/admin"
            component={() => (
              <Redirect to={isLoggedIn ? "/admin/projects" : "/admin/login"} />
            )}
          />
          <Route exact path="/404" component={Page404} />
          {isLoggedIn ? (
            <div dir="ltr">
              <Switch>
                <Route exact path="/admin/projects" component={ProjectsAdmin} />
                <Route exact path="/admin/services" component={ServicesAdmin} />
                <Route exact path="/admin/users" component={UsersAdmin} />
                <Route exact path="/admin/paypal-invoices" component={PaypalInvoicesAdmin} />
                <Redirect to="/admin/projects" />
              </Switch>
            </div>
          ) : (
            <div dir="ltr">
              <Switch>
                <Route
                  exact
                  path="/admin/reset-password"
                  component={ResetPassword}
                />
                <Route exact path="/admin/login" component={Login} />
                <Redirect to="/404" />
              </Switch>
            </div>
          )}
          <Redirect to="/404" />
        </Switch>
      </AnimatePresence>
    </div>
  );
};

export default App;
