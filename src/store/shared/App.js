import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';
import styles from './App.scss';
import SharedContainer from './containers/SharedContainer';
import SearchContainer from './containers/SearchContainer';
import ProductContainer from './containers/ProductContainer';
import PageContainer from './containers/PageContainer';
import IndexContainer from './containers/IndexContainer';
import CheckoutContainer from './containers/CheckoutContainer';
import CategoryContainer from './containers/CategoryContainer';

import { setCurrentPage } from './actions';

import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED, SEARCH } from './pageTypes';


class SwitchContainers extends Component {

   constructor(props){
	   
	  super(props);
	  this.state = { location: this.props.location};
   }


   static getDerivedStateFromProps(nextProps, state) {
	
	  nextProps.setCurrentPage(nextProps.location);

	 if (nextProps.location && state.location) {
		const pathnameChanged =
		     nextProps.location.pathname !== state.location.pathname;
		const queryChanged =
		     nextProps.location.search !== state.location.search;
		const isSearchPage = nextProps.location.pathname === '/search';

		if (pathnameChanged || (queryChanged && isSearchPage)) {
			animateScroll.scrollToTop({
				duration: 500,
				delay: 100,
				smooth: true
			});
		 }
	  }

	  return null;

   }


   render() {
	 
	  const { history, location, currentPage } = this.props;
	  
      const locationPathname = location && location.pathname ? location.pathname : '/';

      switch (currentPage.type) {
			case PRODUCT:
				return <ProductContainer />;
			case PRODUCT_CATEGORY:
				return <CategoryContainer />;
			case SEARCH:
				return <SearchContainer />;
			case PAGE:
				if (locationPathname === '/') {
					return <IndexContainer />;
				} else if (locationPathname === '/checkout') {
					return <CheckoutContainer />;
				} else {
					return <PageContainer />;
				}
			default:
				return <NotFoundContainer />;
		}
   }
}


const mapStateToProps = (state, ownProps) => {
  
	return {
		currentPage: state.app.currentPage
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		setCurrentPage: location => {
			dispatch(setCurrentPage(location));
		}
	};
};


const SwitchContainersConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchContainers);


const App = () => (
     
	<SharedContainer>
		<Route component={SwitchContainersConnected} />
	</SharedContainer>
);

export default App;

