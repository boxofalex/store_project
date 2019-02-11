import * as t from './actionTypes';
import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED, SEARCH } from '../pageTypes';
import queryString from 'query-string';
import { animateScroll } from 'react-scroll';


import { getApi, getApiAjax } from '../lib/settings';



// PAGE ACTIONS
const requestPage = () => ({ type: t.PAGE_REQUEST });

const receivePage = pageDetails => ({ type: t.PAGE_RECEIVE, pageDetails });

const clearPage = () => ({ type: t.PAGE_CLEAR });

export const fetchPage = currentPage => async (dispatch, getState) => {
	let api = getApi();
	const response = await api.get(`/pages/${currentPage.resource}`);
	dispatch(clearPage());
	dispatch(receivePage(response.data));
}


// PRODUCTS ACTIONS
const requestProducts = () => ({ type: t.PRODUCTS_REQUEST });

const receiveProducts = products => ({ type: t.PRODUCTS_RECEIVE, products });

const clearProducts = () => ({ type: t.PRODUCTS_CLEAR });

export const fetchProducts = () => async (dispatch, getState) => {
    let api = getApi();
	dispatch(requestProducts());
	const { app } = getState();
	const filter = getParsedProductFilter(app.productFilter);
	const response = await api.get('/products', { params: filter });
	dispatch(receiveProducts(response.data));
};

const requestMoreProducts = () => ({ type: t.MORE_PRODUCTS_REQUEST });

const receiveMoreProducts = products => ({
	type: t.MORE_PRODUCTS_RECEIVE,
	products
});

export const fetchMoreProducts = () => async (dispatch, getState) => {
	let api = getApi();
	const { app } = getState();
	if (
		app.loadingProducts ||
		app.loadingMoreProducts ||
		app.products.length === 0 ||
		!app.productsHasMore
	) {
		return;
	} else {
		dispatch(requestMoreProducts());

		const filter = getParsedProductFilter(app.productFilter);
		filter.offset = app.products.length;

		const response = await api.get('/products', {params: filter});
		const products = response.data;
		dispatch(receiveMoreProducts(products));
		animateScroll.scrollMore(200);
	}
};



// PRODUCT ACTIONS
const requestProduct = () => ({ type: t.PRODUCT_REQUEST });

const receiveProduct = product => ({ type: t.PRODUCT_RECEIVE, product });

const clearProduct = () => ({ type: t.PRODUCT_CLEAR });

export const fetchProduct = currentPage => async (dispatch, getState) => {
    let api = getApi();
	const response = await api.get(`/products/${currentPage.resource}`);
	dispatch(receiveProduct(response.data));
}


// CATEGORY ACTIONS
const clearCurrentCategory = () => ({
	type: t.CLEAR_CURRENT_CATEGORY
})

const setCurrentCategory = category => ({
	type: t.SET_CURRENT_CATEGORY,
	category
});

export const setCategory = categoryId => (dispatch, getState) => {
	const { app } = getState();
	const category = app.categories.find(c => c.id === categoryId);
	if (category) {
		dispatch(setCurrentCategory(category));
		dispatch(setProductsFilter({ categoryId: categoryId }));
	}
};


// FILTER ACTIONS
export const getProductFilterForCategory = (locationSearch, sortBy) => {
	const queryFilter = queryString.parse(locationSearch);

	let attributes = {};
	for (const querykey in queryFilter) {
		if (querykey.startsWith('attributes.')) {
			attributes[querykey] = queryFilter[querykey];
		}
	}

	return {
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		attributes: attributes,
		search: null,
		sort: sortBy
	};
};

export const getProductFilterForSearch = locationSearch => {
	const queryFilter = queryString.parse(locationSearch);

	return {
		categoryId: null,
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		search: queryFilter.search,
		sort: 'search'
	};
};

export const getParsedProductFilter = productFilter => {
	const filter = Object.assign(
		{},
		{
			on_sale: productFilter.onSale,
			search: productFilter.search,
			category_id: productFilter.categoryId,
			price_from: productFilter.priceFrom,
			price_to: productFilter.priceTo,
			sort: productFilter['sort'],
			fields: productFilter['fields'],
			limit: productFilter['limit'],
			offset: 0
		},
		productFilter.attributes
	);

	return filter;
};

export const setSort = sort => (dispatch, getState) => {

	dispatch(setProductsFilter({ sort: sort }));
	dispatch(fetchProducts());
};

const setProductsFilter = filter => ({
	type: t.SET_PRODUCTS_FILTER,
	filter: filter
});


// CART ACTIONS
const requestAddCartItem = () => ({ type: t.CART_ITEM_ADD_REQUEST });


export const updateCartItemQuantity = (item_id, quantity) => async (
	dispatch,
	getState
) => {
	let api = getApi();
	dispatch(requestUpdateCartItemQuantity());
	const response = await api.put(`/cart/items/${item_id}`, {
		quantity: quantity});
	dispatch(receiveCart(response.data));
	dispatch(fetchShippingMethods());
};

const requestUpdateCartItemQuantity = () => ({
	type: t.CART_ITEM_UPDATE_REQUEST
});

export const deleteCartItem = item_id => async (dispatch, getState) => {
	let api = getApi();
	dispatch(requestDeleteCartItem());
	const { app } = getState();
	const response = await api.delete(`/cart/items/${item_id}`);
	dispatch(receiveCart(response.data));
	dispatch(fetchShippingMethods());
};

const requestDeleteCartItem = () => ({ type: t.CART_ITEM_DELETE_REQUEST });

export const updateCart = (data, callback) => async (dispatch, getState) => {
	let api = getApi();
	const response = await api.put('/cart', data);
	const newCart = response.data;
	dispatch(receiveCart(newCart));
	if (typeof callback === 'function') {
		callback(newCart);
	}
};

const requestCart = () => ({ type: t.CART_REQUEST });

const receiveCart = cart => ({ type: t.CART_RECEIVE, cart });

export const fetchCart = () => async (dispatch, getState) => {
	let api = getApi();
	dispatch(requestCart());
	const response = await api.get('/cart');
	const cart = response.data;
	dispatch(receiveCart(cart));
};

export const addCartItem = item => async (dispatch, getState) => {
	let api = getApi();
	dispatch(requestAddCartItem());
	const response = await api.post('/cart/items', item);
	const cart = response.data;
	dispatch(receiveCart(cart));
};




// PAYMENT ACTIONS
const requestPaymentMethods = () => ({ type: t.PAYMENT_METHODS_REQUEST });

const receivePaymentMethods = methods => ({
	type: t.PAYMENT_METHODS_RECEIVE,
	methods
});

export const fetchPaymentMethods = () => async (dispatch, getState) => {
	let api = getApi();
	dispatch(requestPaymentMethods());
	const response = await api.get('/payment_methods');
	dispatch(receivePaymentMethods(response.data));
};



// SHIPPING ACTIONS
const requestShippingMethods = () => ({ type: t.SHIPPING_METHODS_REQUEST });

const receiveShippingMethods = methods => ({
	type: t.SHIPPING_METHODS_RECEIVE,
	methods
});

export const fetchShippingMethods = () => async (dispatch, getState) => {
	let api = getApi();
	dispatch(requestShippingMethods());
	const response = await api.get(`/shipping_methods`);
	dispatch(receiveShippingMethods(response.data));
};



// CHECKOUT ACTIONS
const requestCheckout = () => ({ type: t.CHECKOUT_REQUEST });

const receiveCheckout = order => ({ type: t.CHECKOUT_RECEIVE, order });

export const checkout = (cart, history) => async (dispatch, getState) => {
	let api = getApi();
	let apiAjax = getApiAjax();
	dispatch(requestCheckout());
	if (cart) {
		await apiAjax.put('/cart',{
			shipping_address: cart.shipping_address,
			billing_address: cart.billing_address,
			email: cart.email,
			mobile: cart.mobile,
			payment_method_id: cart.payment_method_id,
			shipping_method_id: cart.shipping_method_id,
			comments: cart.comments
		});
	}

	const cartResponse = await apiAjax.get('/cart');

	const chargeNeeded = !!cartResponse.data.payment_token;

	if (chargeNeeded) {
		const chargeResponse = await apiAjax.post('/cart/charge');
		const chargeSucceeded = chargeResponse.status === 200;
		if (!chargeSucceeded) {
			return;
		}
	}

	const response = await apiAjax.put('/cart/checkout');
	const order = response.data;
	dispatch(receiveCheckout(order));
	history.push('/checkout-success');
};






// OTHER ACTIONS
export const receiveSitemap = currentPage => ({
	type: t.SITEMAP_RECEIVE,
	currentPage
});

export const setCurrentLocation = location => ({
	type: t.LOCATION_CHANGED,
	location
});

export const setCurrentPage = (location) => async (dispatch, getState) => {
	let api = getApi();
	let locationPathname = '/404';
	let locationSearch = '';
	let locationHash = '';
	
	if (location) {
		locationPathname = location.pathname;
		locationSearch = location.search;
		locationHash = location.hash;
	}

	const { app } = getState();
	let statePathname = '/404';
	let stateSearch = '';
	let stateHash = '';

	if (app.location) {
		statePathname = app.location.pathname;
		stateSearch = app.location.search;
		stateHash = app.location.hash;
	}

	const currentPageAlreadyInState =
		statePathname === locationPathname && stateSearch === locationSearch;

	if (currentPageAlreadyInState) {
		// same page
	} else {
	
		dispatch(
			setCurrentLocation({
				hasHistory: true,
				pathname: locationPathname,
				search: locationSearch,
				hash: locationHash
			})
		);

		const category = app.categories.find(c => c.path === locationPathname);

		if (category) {
			const newCurrentPage = {
				type: 'product-category',
				path: category.path,
				resource: category.id
			};
			
			dispatch(receiveSitemap(newCurrentPage));
			dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
		} else {
		   
			const sitemapResponse = await api.get('/sitemap', { params: {
				path: locationPathname, 
				enabled: true
			}}).catch( err => console.log(err));

			if (sitemapResponse.status === 404) {
				dispatch(
					receiveSitemap({
						type: 404,
						path: locationPathname,
						resource: null
					})
				);
			} else {
			
				const newCurrentPage = sitemapResponse.data;
				dispatch(receiveSitemap(newCurrentPage));
				dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
			}
		}
	}
};


const fetchDataOnCurrentPageChange = currentPage => async (dispatch, getState) => {
	let api = getApi();
	const { app } = getState();
	let productFilter = null;
   
	// clear data
	// dispatch(clearProduct());
	// dispatch(clearPage());
	// dispatch(clearProducts());
	// dispatch(clearCurrentCategory());


	switch (currentPage.type) {

		case PRODUCT_CATEGORY:
			productFilter = getProductFilterForCategory(
				app.location.search,
				app.settings.default_product_sorting
			);
			dispatch(setCategory(currentPage.resource));
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts());
			break;

		case SEARCH:
			productFilter = getProductFilterForSearch(app.location.search);
			dispatch(setProductsFilter(productFilter));
			dispatch(fetchProducts());
			break;

		case PRODUCT:
	
			dispatch(fetchProduct(currentPage));
			break;

		case PAGE:
			dispatch(fetchPage(currentPage));
			break;
	}
};
