import { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

//Routes
import {
	Home,
	WhoWeAre,
	ContactUs,
	Services,
	ServicePage,
	Portfolio,
	SideMenu,
	Careers,
	Login,
	ResetPassword,
	Users,
} from './routes';

//Components
import { Header, Footer } from './components';
//Style
import './assets/style/_global.scss';

const App = () => {
	const { i18n } = useTranslation();
	const location = useLocation();

	useEffect(() => {
		//Localization
		document.dir = i18n.dir(i18n.language);
		if (i18n.language == 'ar') document.getElementsByTagName('body')[0].classList.add('rtl-layout');
		else document.getElementsByTagName('body')[0].classList.remove('rtl-layout');
		i18n.on('languageChanged', (lang) => {
			window.location.reload();
		});
	}, []);

	return (
		<div className="app-container" data-test="hello">
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route exact path="/" component={Home} />
					<Route exact path="/who-we-are" component={WhoWeAre} />
					<Route exact path="/contact-us" component={ContactUs} />
					<Route exact path="/our-services/:service" component={ServicePage} />
					<Route path="/our-services" component={Services} />
					<Route exact path="/portfolio" component={Portfolio} />
					<Route exact path="/menu" component={SideMenu} />
					<Route exact path="/careers" component={Careers} />
					<Route exact path="/admin" component={() => <Redirect to="/admin/login" />} />
					<Route exact path="/admin/login" component={Login} />
					<Route exact path="/admin/reset-password" component={ResetPassword} />
					<Route exact path="/admin/users" component={Users} />
				</Switch>
			</AnimatePresence>
			{/* <Footer /> */}
		</div>
	);
};

export default App;
