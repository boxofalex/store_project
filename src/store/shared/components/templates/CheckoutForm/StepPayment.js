import React from 'react';
import { getThemeSettings, getText } from '../../../lib/settings';
import PaymentForm from './paymentForm';

import styles from './StepPayment.module.scss';

const CheckoutStepPayment = props => {
	const {
		cart,
		settings,
		processingCheckout,
		handleSuccessPayment,
		inputClassName,
		buttonClassName,
		show,
		title,
		onCreateToken
	} = props;

	const { payment_method_gateway, grand_total } = cart;

	const text = getText();

	if (!show) {
		return (
			<div>
				<h1>
					<span>3</span>
					{title}
				</h1>
			</div>
		);
	}
	return (
		<div className={styles.paymentArea}>
			<h2 className={styles.paymentAreaTitle}>
				<span>3</span>
				{title}
			</h2>
			<div className={styles.paymentAreaForm}>
				{!processingCheckout && (
					<PaymentForm
						gateway={payment_method_gateway}
						amount={grand_total}
						shopSettings={settings}
						onPayment={handleSuccessPayment}
						onCreateToken={onCreateToken}
					/>
				)}
				{processingCheckout && <p>{text.loading}</p>}
			</div>
		</div>
	);
};

export default CheckoutStepPayment;
