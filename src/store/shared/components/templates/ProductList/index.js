import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

import styles from './ProductList.module.scss';


const ProductList = ({
	products,
	addCartItem,
	settings,
	loadMoreProducts,
	hasMore,
	loadingProducts,
	loadingMoreProducts,
}) => {

    const items = products
    ? products.map(product => (

            <Item key={product.id} product={product} addCartItem={addCartItem} settings={settings}/>
      ))
    : null;

    return <Fragment>
            {items}
    </Fragment>

}

export default ProductList;