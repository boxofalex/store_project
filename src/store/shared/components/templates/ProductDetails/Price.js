import React, { Fragment, Component } from 'react';
import * as helper from '../../../lib/helper';
import { getThemeSettings, getText } from '../../../lib/settings';

import styles from './Price.module.scss';




const FormattedCurrency = ({ number, settings }) =>
	helper.formatCurrency(number, settings);

const NewAndOldPrices = ({ newPrice, oldPrice, settings }) => (
	<div>
		<span >
			<FormattedCurrency settings={settings} number={newPrice} />
		</span>
		<del>
			<FormattedCurrency settings={settings} number={oldPrice} />
		</del>

	</div>
);

const Price = ({ product, variant, isAllOptionsSelected, settings }) => {

    const themeSettings = getThemeSettings().others;

	let priceStyle = {};
	if (
		themeSettings.details_price_size &&
		themeSettings.details_price_size > 0
	) {
		priceStyle.fontSize = themeSettings.details_price_size + 'px';
	}
	if (
		themeSettings.details_price_color &&
		themeSettings.details_price_color.length > 0
	) {
		priceStyle.color = themeSettings.details_price_color;
	}

	let price = 0;
	let oldPrice = 0;

	if (product.variable && variant && variant.price > 0) {
		price = variant.price;
	} else {
		price = product.regular_price;
	}

	if (product.on_sale) {
		oldPrice = product.regular_price;
	}

	if (oldPrice > 0) {
		return <Fragment>
				<NewAndOldPrices settings={settings} newPrice={price} oldPrice={oldPrice}
			/> </Fragment>
	} else {
		return <Fragment>
               <FormattedCurrency settings={settings} number={price} />
		</Fragment>
	}
};

export default Price;