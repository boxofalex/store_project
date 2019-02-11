import React from 'react';
import * as helper from '../../../lib/helper';
import { getThemeSettings, getText } from '../../../lib/settings';

import styles from './AddToCartButton.module.scss';


const AddToCartButton = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected
}) => {
    
	const text = getText();
	const themeSettings = getThemeSettings();
	const others = themeSettings.others;

	// if (
	// 	themeSettings.button_addtocart_bg &&
	// 	themeSettings.button_addtocart_bg.length > 0
	// ) {
	// 	buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
	// }
	// if (
	// 	themeSettings.button_addtocart_color &&
	// 	themeSettings.button_addtocart_color.length > 0
	// ) {
	// 	buttonStyle.color = themeSettings.button_addtocart_color;
	// }

	let addToCartText = others.button_addtocart_text && others.button_addtocart_text.length > 0 ? others.button_addtocart_text : text.addToCart;

	if (product.stock_status === 'discontinued') {
		return (
			<button  disabled>
				{text.discontinued}
			</button>
		);
	} else if (product.variable && variant && variant.stock_quality > 0) {
		return (
			<button onClick={addCartItem}>
				{addToCartText}
			</button>
		);
	} else if (product.variable && !isAllOptionsSelected) {
		return (
			<button disabled>
				{text.optionsRequired}
			</button>
		);
	} else if (product.variable && !product.stock_backorder) {
		return (
			<button disabled>
				{text.outOfStock}
			</button>
		);
	} else if (product.stock_status === 'available') {
		return (
			<button onClick={addCartItem}>
				{addToCartText}
			</button>
		);
	} else if (product.stock_status === 'out_of_stock') {
		return (
			<button disabled>
				{text.outOfStock}
			</button>
		);
	} else {
		return null;
	}
};

export default AddToCartButton;
