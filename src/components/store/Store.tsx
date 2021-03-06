import React, { useEffect, useState } from 'react';
import style from './Store.module.scss';
import { connect, RootStateOrAny } from 'react-redux';
import { fetchStoreItems, startOrder, fetchCheckout, clearCheckout } from '../../actions/store';
import SearchBar from './search/SearchBar';
import StoreItems from './StoreItems';
import Carousel from './carousel/Carousel';
import ViewResults from './ViewResults';

interface Props {
	fetchStoreItems: () => any;
	startOrder: () => any;
	fetchCheckout: (val: any) => any;
	clearCheckout: () => void;
	store: {
		checkout: any;
		searchTerm: string;
		searchResults: Array<any>;
		catalog: Array<any>;
	};
}

const Store = ({
	fetchStoreItems,
	startOrder,
	fetchCheckout,
	store: { checkout, searchTerm, catalog, searchResults },
	clearCheckout,
}: Props) => {
	const [resultAmt, filterResults] = useState<number>(0);

	useEffect(() => {
		if (checkout && checkout.order) {
			clearCheckout();
		}
	}, [checkout, clearCheckout]);
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);
	useEffect(() => {
		//if a checkout has not been completed update current
		if (!localStorage.getItem('checkout')) {
			console.log('new order');
			startOrder();
		} else {
			console.log('found order', localStorage.getItem('checkout'));
			const id = localStorage.getItem('checkout') || '';
			fetchCheckout(id);
		}
	}, [startOrder, fetchCheckout]);

	//get result amount
	useEffect(() => {
		if (searchTerm !== 'All') {
			filterResults(searchResults.length);
		} else {
			filterResults(catalog.length);
		}
	}, [catalog, searchTerm, searchResults]);

	return (
		<section className={style.section}>
			<Carousel />
			<SearchBar />
			<ViewResults searchTerm={searchTerm} resultAmt={resultAmt} />
			<div className={style.store_grid}>
				<StoreItems />
			</div>
		</section>
	);
};

const mapStateToProps = (state: RootStateOrAny) => ({
	store: state.store,
});

export default connect(mapStateToProps, { fetchStoreItems, startOrder, fetchCheckout, clearCheckout })(Store);
