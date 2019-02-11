import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withDimenstions from '../../lib/isMobile';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import * as helper from '../../lib/helper';
import { NavLink } from 'react-router-dom';
import ProductList from '../../components/templates/ProductList';
import ProductFilter from '../../components/templates/ProductFilter';
import Sort from '../../components/templates/Sort';
import { getThemeSettings, getText } from '../../lib/settings';

import styles from './Category.module.scss';

const CategoryBreadcrumbs = ({ currentCategory, categories }) => {

	const text = getText();

	const items = helper.getCategoryBreadcrumbs(currentCategory.id, categories);
	
	let style = {
		paddingRight: '0.2rem'
	};

	return (
		<nav className={styles.categoryBreadcrumbs}>
			<ul>
				<li >
					<NavLink to="/" style={style}>{text.home}</NavLink>
					<span>&#47;</span>
				</li>
				{items}
				<li>
					<NavLink to={currentCategory.path}>
					     {currentCategory.name}
					</NavLink>	
				</li>
			</ul>
		</nav>
	);
};



const CategoryContainer = (props) => {
	
	const {
		setSort,
		addCartItem,
		loadMoreProducts,
		getJSONLD,
		state,
		state: {
			products,
			categoryDetails,
			settings,
			productFilter,
			productsHasMore,
			categories,
			loadingProducts,
			loadingMoreProducts
		}
	} = props;

    return <Fragment>
        <div className={styles.categoryHero}>
			<CategoryBreadcrumbs currentCategory={categoryDetails} categories={categories}/>
	    </div>
		<div className={styles.productContainer}>
			<div className={styles.productFilter}>
                <ProductFilter {...props}/>
			</div>
			<div className={styles.productSortList}>
			  <div className={styles.productSort}>
			       <Sort defaultSort={settings.default_product_sorting} currentSort={productFilter.sort} setSort={setSort} /> 
			  </div>
			  <div className={styles.productList}>
			     <ProductList 
				    products={products}
					addCartItem={addCartItem}
					settings={settings}
					loadMoreProducts={loadMoreProducts}
					hasMore={productsHasMore}
					loadingProducts={loadingProducts}
					loadingMoreProducts={loadingMoreProducts}
				 />
			  </div>
			</div>
		</div>
	</Fragment>
}


export default withDimenstions(withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CategoryContainer)
));