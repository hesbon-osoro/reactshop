import React, { FC, Suspense, lazy, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	RouteComponentProps,
	Switch,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from './Header';
import ProductsPage from './ProductsPage';
import ProductPage from './ProductPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import ContactUsPage from './ContactUsPage';

const AdminPage = lazy(() => import('./AdminPage'));

const RoutesWrap: FC = () => {
	return (
		<Router>
			<Route component={Routes} />
		</Router>
	);
};
const Routes: FC<RouteComponentProps> = props => {
	const [loggedIn, setLoggedIn] = useState(true);
	return (
		<div>
			<Header />
			<TransitionGroup>
				<CSSTransition
					key={props.location.key}
					timeout={500}
					classNames="animate"
				>
					<Switch>
						<Redirect exact={true} from="/" to="/products" />
						<Route exact={true} path="/products" component={ProductsPage} />
						<Route path="/products/:id" component={ProductPage} />
						<Route path="/contactus" component={ContactUsPage} />
						<Route path="/admin">
							{loggedIn ? (
								<Suspense
									fallback={<div className="page-container">Loading ...</div>}
								>
									<AdminPage />
								</Suspense>
							) : (
								<Redirect to="/login" />
							)}
						</Route>
						<Route path="/login" component={LoginPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
};

export default RoutesWrap;
