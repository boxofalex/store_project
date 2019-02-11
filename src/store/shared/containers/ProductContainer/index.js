import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ProductDetails from '../../components/templates/ProductDetails';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';

import styles from './Product.module.scss';

const ProductContainer = props => {
	const {
		addCartItem,
		state: { productDetails, settings, categories, shippingMethods},
		loadShippingMethods
	} = props;

	
	if (productDetails) {
		
		return (
			<Fragment>

				<ProductDetails
					settings={settings}
					product={productDetails}
					addCartItem={addCartItem}
					categories={categories}
					shippingMethods={shippingMethods}
					loadShippingMethods={loadShippingMethods}
				/>
			</Fragment>
		);
	}
	return null;
};




export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ProductContainer)
);