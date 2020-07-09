import React from 'react';
import './css/main.css';
import { Landing } from './components/pages/Landing';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './components/pages/Main';
import { Provider } from 'react-redux';
import store from './store';
import StorePage from './components/pages/StorePage';
import Epk from './components/pages/Epk';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/main" component={Main} />
					<Route exact path="/store" component={StorePage} />
					<Route exact path="/epk" component={Epk} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
