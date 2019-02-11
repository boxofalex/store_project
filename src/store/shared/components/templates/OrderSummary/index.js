import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getThemeSettings, getText } from '../../../lib/settings';
import * as helper from '../../../lib/helper';

import styles from './OrderSummary.module.scss';

const SummaryItem = ({ settings, item, updateCartItemQuantity }) => {
    
    const text = getText();
    const themeSettings = getThemeSettings();

	const qtyOptions = [];
	const maxQty = item.stock_backorder
		? themeSettings.maxCartItemQty
		: item.stock_quality >= themeSettings.maxCartItemQty
			? themeSettings.maxCartItemQty
			: item.stock_quality;

	for (let i = 0; i <= maxQty; i++) {
		const optionText = i === 0 ? text.remove : i;
		qtyOptions.push(
			<option key={i} value={i}>
				{optionText}
			</option>
		);
	}

	return (
		<div className={styles.summaryItem}>
            <div className={styles.summaryItemImage}>
                <NavLink to={item.path}>
                    <img
                        src={item.image_url}
                        alt={item.name}
                        title={item.name}
                    />
                </NavLink>
			</div>
			<div className={styles.itemHandle}>
				<div className={styles.itemName}>
					<NavLink to={item.path}>{item.name}</NavLink>
				</div>
				{item.variant_name.length > 0 && (
					<div>{item.variant_name}</div>
				)}
				<div className={styles.itemQuantity}>
					<span>{text.qty}:</span>
					<span>
						<select onChange={e => { updateCartItemQuantity(item.id, e.target.value); }} value={item.quantity}>
							{qtyOptions}
						</select>
					</span>
				</div>
			</div>
			<div className={styles.itemPrice}>
				{helper.formatCurrency(item.price_total, settings)}
			</div>
		</div>
	);
};

SummaryItem.propTypes = {
	settings: PropTypes.shape({}).isRequired,
	item: PropTypes.shape({}).isRequired,
	updateCartItemQuantity: PropTypes.func.isRequired
};





const OrderSummary = props => {
    
	const {
		updateCartItemQuantity,
		state: { cart, settings }
    } = props;


    const text = getText();

	if (cart && cart.items && cart.items.length > 0) {
		const items = cart.items.map(item => (
			<SummaryItem
				key={item.id}
				item={item}
				updateCartItemQuantity={updateCartItemQuantity}
				settings={settings}
			/>
		));

		return (
			<div className={styles.orderSummaryArea}>
                <div className={styles.mainTitle}>
                     {text.orderSummary}
                </div>
				<hr />
				{items}
				<div className={styles.subtotalPriceArea}>
                    <div className={styles.subtotalTitle}>
                        {text.subtotal}
                    </div>
					<div className={styles.priceSubtotal}>
						{helper.formatCurrency(cart.subtotal, settings)}
					</div>
                    <div className={styles.shippingTitle}>
                        {text.shipping}
                    </div>
					<div className={styles.shippingSubtotal}>
						{helper.formatCurrency(cart.shipping_total, settings)}
					</div>

					{cart.discount_total > 0 && (
						<div >{text.discount}</div>
					)}
					{cart.discount_total > 0 && (
						<div >
							{helper.formatCurrency(cart.discount_total, settings)}
						</div>
                    )}
                </div>
                <hr />
                <div className={styles.grandTotalArea}>
                    <div className={styles.grandTotalTitle}>
                       {text.grandTotal}
                    </div>
					<div className={styles.grandTotal}>
						{helper.formatCurrency(cart.grand_total, settings)}
					</div>
				</div>
			</div>
		);
	}
	return null;
};

OrderSummary.propTypes = {
	updateCartItemQuantity: PropTypes.func.isRequired,
	state: PropTypes.shape({
		cart: PropTypes.shape({}),
		settings: PropTypes.shape({}).isRequired
	}).isRequired
};

export default OrderSummary;
