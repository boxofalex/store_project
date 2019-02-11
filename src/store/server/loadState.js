import { getApi, getApiAjax } from '../shared/lib/settings';
import * as textLocales from '../shared/lib/getText';
import {
	PAGE,
	PRODUCT_CATEGORY,
	PRODUCT,
	RESERVED,
	SEARCH
} from '../shared/pageTypes';

import { 
	getParsedProductFilter,
	getProductFilterForCategory,
	getProductFilterForSearch
 }  from '../shared/actions';

const PRODUCT_FIELDS =
	'slug,id,name,category_id,enabled,discontinued,stock_quality,regular_price,attributes,gallery';

const CATEGORIES_FIELDS =
	'name,image,parent_id,enabled,slug,id';

	

const getCurrentPage = path => {

	let api = getApi();

	return api.get('/sitemap', { params: { path: path, enabled: true }
	}).then(sitemapResponse => {

			if (sitemapResponse.status === 200) {
				return sitemapResponse.data;
			} else if (sitemapResponse.status === 404) {
				return {
					type: 404,
					path: path,
					resource: null
				};
			} else {
				return Promise.reject(`Page response code = ${sitemapResponse.status}`);
			}
		}).catch( err => console.log(err));
};


const getProducts = (currentPage, productFilter) => {

	let api = getApi();

	if (currentPage.type === PRODUCT_CATEGORY || currentPage.type === SEARCH) {
		let filter = getParsedProductFilter(productFilter);
		filter.enabled = true;
		return api.get('/products', { params: filter }).then(({ status, data }) => data);
	} else {
		return null;
	}
};


const getProduct = currentPage => {

	let api = getApi();

	if (currentPage.type === PRODUCT) {
		return api.get(`/products/${currentPage.resource}`).then(({ status, data }) => data);
	} else {
		return {};
	}
};


const getPage = currentPage => {

	let api = getApi();

	if (currentPage.type === PAGE) {
		return api.get(`/pages/${currentPage.resource}`).then(({ status, data }) => data);
	} else {
		return {};
	}
};


const getFilter = (currentPage, urlQuery, settings) => {

	let productFilter = {};

	if (currentPage.type === PRODUCT_CATEGORY) {
		productFilter = getProductFilterForCategory(
			urlQuery,
			settings.default_product_sorting
		);
		productFilter.categoryId = currentPage.resource;

	} else if (currentPage.type === SEARCH) {
		productFilter = getProductFilterForSearch(urlQuery);
	}
	
	productFilter.fields =
		settings.product_fields && settings.product_fields !== ''
			? settings.product_fields
			: PRODUCT_FIELDS;

	productFilter.limit =
		settings.products_limit && settings.products_limit !== 0
			? settings.products_limit
			: 30;

	return productFilter;
};



const getAllData = (currentPage, productFilter, cookie) => {

    let api = getApi();
	let apiAjax = getApiAjax();

	return Promise.all([
		api.get('/settings/checkout/fields').then(({ status, data }) => data),
		api.get('/product_categories', { params: { enabled: true, fields: CATEGORIES_FIELDS }
		}).then(({ status, data }) => data),
		apiAjax.get('/cart', { headers: { cookie: cookie || ''}}).then(({ status, data }) => data),
		getProducts(currentPage, productFilter),
		getProduct(currentPage),
		getPage(currentPage),
	]).then(
		([  
			checkoutFields,
			categories,
			cart,
			products,
			product,
			page
		]) => {
			let categoryDetails = null;
			if (currentPage.type === PRODUCT_CATEGORY) {
				categoryDetails = categories.find(c => c.id === currentPage.resource);
			}
			return {
				checkoutFields,
				categories,
				cart,
				products,
				product,
				page,
				categoryDetails,
			};
		}
	);
};



const getState = (currentPage, settings, allData, location, productFilter) => {
	const {
		checkoutFields,
		categories,
		cart,
		products,
		product,
		page,
		categoryDetails,
	} = allData;

	let productsTotalCount = 0;
	let productsHasMore = false;
	let productsMinPrice = 0;
	let productsMaxPrice = 0;
	let productsAttributes = [];

	if (products) {
		productsTotalCount = products.total_count;
		productsHasMore = products.has_more;
		productsAttributes = products.attributes;

		if (products.price) {
			productsMinPrice = products.price.min;
			productsMaxPrice = products.price.max;
		}
	}

	const state = {
		app: {
			settings: settings,
			location: location,
			currentPage: currentPage,
			pageDetails: page,
			categoryDetails: categoryDetails,
			productDetails: product,
			categories: categories,
			products: products && products.data ? products.data : [],
			productsTotalCount: productsTotalCount,
			productsHasMore: productsHasMore,
			productsMinPrice: productsMinPrice,
			productsMaxPrice: productsMaxPrice,
			productsAttributes: productsAttributes,
			paymentMethods: [],
			shippingMethods: [],
			loadingProducts: false,
			loadingMoreProducts: false,
			loadingShippingMethods: false,
			loadingPaymentMethods: false,
			processingCheckout: false,
			productFilter: {
				onSale: null,
				search: productFilter.search || '',
				categoryId: productFilter.categoryId,
				priceFrom: productFilter.priceFrom || 0,
				priceTo: productFilter.priceTo || 0,
				attributes: productFilter.attributes,
				sort: settings.default_product_sorting,
				fields:
					settings.product_fields && settings.product_fields !== ''
						? settings.product_fields
						: PRODUCT_FIELDS,
				limit:
					settings.products_limit && settings.products_limit !== 0
						? settings.products_limit
						: 30
			},
			cart: cart,
			order: null,
			checkoutFields: checkoutFields
		}
	};

	return state;
};


export const loadState = (req, language) => {
	
    let api = getApi();

	const cookie = req.get('cookie') || '';
	
	const urlPath = req.path;
	const urlQuery = req.url.includes('?')
		? req.url.substring(req.url.indexOf('?'))
		: '';
	const location = {
		hasHistory: false,
		pathname: urlPath,
		search: urlQuery,
		hash: ''
	};

	return Promise.all([
		getCurrentPage(req.path),
		api.get('/settings').then(({ status, data }) => data),
		textLocales.getText(`/theme/locales/${language}`),
	]).then(([currentPage, settings, textLocales]) => {

		const productFilter = getFilter(currentPage, urlQuery, settings);
		
		return getAllData(currentPage, productFilter, cookie).then(allData => {
		
			const state = getState(
				currentPage,
				settings,
				allData,
				location,
				productFilter
			);

			return {
				state: state,
				textLocales: textLocales
			};
		});
	}).catch((err) => {
		console.log(err);
	});
};
