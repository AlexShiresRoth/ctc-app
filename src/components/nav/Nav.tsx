import React, { useEffect } from 'react';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { logo } from '../svgs/logo';
import Cart from './cart/Cart';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/store';

interface NavProps {
	clearSearch: () => any;
}

type Props = RouteComponentProps & NavProps;

const Nav = ({ history, clearSearch }: Props) => {
	useEffect(() => {
		//if location is not the store then don't have the cart popup
		if (!history.location.pathname.includes('store')) {
			clearSearch();
		}
	}, [clearSearch, history.location.pathname]);

	return (
		<nav className={style.nav}>
			<div className={style.left}>
				<NavLink to="/main">{logo}</NavLink>
			</div>

			<div className={style.right}>
				{navLinks.map((item) => {
					return (
						<NavLink to={item.path} key={item.id}>
							{item.name}
						</NavLink>
					);
				})}
				<Cart />
			</div>
		</nav>
	);
};

export default connect(null, { clearSearch })(withRouter(Nav));
