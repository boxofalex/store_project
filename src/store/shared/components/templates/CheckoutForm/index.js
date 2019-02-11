import React, { Fragment, Component } from 'react';
import { getThemeSettings, getText } from '../../../lib/settings';
import CheckoutStepContacts from './StepContacts';
import CheckoutStepShipping from './StepShipping';
import CheckoutStepPayment from './StepPayment';


import styles from './CheckoutForm.module.scss';


export default class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1
        };
        

	this.changeStep = step => {
		this.setState({ step: step });
	};

	this.handleContactsSave = () => {
		this.changeStep(2);
	};

	this.handleContactsEdit = () => {
		this.changeStep(1);
	};

	this.handleShippingSave = () => {
	
		this.changeStep(3);
	};

	this.handleShippingEdit = () => {
		this.changeStep(2);
	};

	this.handleContactsSubmit = values => {
		this.props.updateCart({
			email: values.email,
			mobile: values.mobile
		});
		this.handleContactsSave();
	};

	this.handleLocationSave = shippingLocation => {
		this.props.updateCart(
			{
				shipping_address: shippingLocation,
				billing_address: shippingLocation,
			});
	};

	this.handleShippingMethodSave = (shippingMethodId, shippingMethodName) => {
		this.props.updateCart(
			{
				shipping_method_id: shippingMethodId,
			});
	};

	this.handlePaymentMethodSave = paymentMethodId => {
		this.props.updateCart({
			payment_method_id: paymentMethodId
		});
	};

	this.isShowPaymentForm = () => {
		const { payment_method_gateway } = this.props.state.cart;
		const paymentGatewayExists =
			payment_method_gateway && payment_method_gateway !== '';
		return paymentGatewayExists;
	};

	this.handleShippingSubmit = values => {
	
		
		if (this.isShowPaymentForm()) {

			const { shipping_address, billing_address, comments } = values;

			this.props.updateCart({
				shipping_address,
				billing_address,
				comments
			});
			this.handleShippingSave();
		} else {
			this.props.checkout();
		}
	};

	this.handleSuccessPayment = () => {
		this.props.checkout(null);
	};

	this.handleCheckoutWithToken = tokenId => {
		this.props.updateCart(
			{
				payment_token: tokenId
			},
			cart => {
				this.props.checkout(null);
			}
		);
	  };
	}

	componentDidMount() {
		this.props.loadShippingMethods();
		this.props.loadPaymentMethods();
    }
    

	render() {
        const { step } = this.state;
        
        const text = getText();

		const {
			settings,
			cart,
			paymentMethods,
			shippingMethods,
			loadingShippingMethods,
			loadingPaymentMethods,
			checkoutFields,
			processingCheckout
		} = this.props.state;

	    

		if (cart && cart.items.length > 0) {
			const showPaymentForm = this.isShowPaymentForm();

			let shippingMethod = null;
			const { shipping_method_id } = cart;
			if (shipping_method_id && shippingMethods && shippingMethods.length > 0) {
				shippingMethod = shippingMethods.find(
					method => method.id === shipping_method_id
				);
			}

			return <Fragment>
                		<CheckoutStepContacts
						isReadOnly={step > 1}
						title={text.customerDetails}
						// inputClassName={checkoutInputClass}
						// buttonClassName={checkoutButtonClass}
						// editButtonClassName={checkoutEditButtonClass}
						settings={settings}
						paymentMethods={paymentMethods}
						shippingMethods={shippingMethods}
						loadingShippingMethods={loadingShippingMethods}
						loadingPaymentMethods={loadingPaymentMethods}
						checkoutFields={checkoutFields}
						onEdit={this.handleContactsEdit}
						onSubmit={this.handleContactsSubmit}
						saveShippingLocation={this.handleLocationSave}
						saveShippingMethod={this.handleShippingMethodSave}
						savePaymentMethod={this.handlePaymentMethodSave}
					/>

					<CheckoutStepShipping
						show={step >= 2}
						isReadOnly={step > 2}
						title={text.shipping}
						// inputClassName={checkoutInputClass}
						// buttonClassName={checkoutButtonClass}
						// editButtonClassName={checkoutEditButtonClass}
						initialValues={cart}
						cart={cart}
						settings={settings}
						processingCheckout={processingCheckout}
						shippingMethod={shippingMethod}
						checkoutFields={checkoutFields}
						saveShippingLocation={this.handleLocationSave}
						showPaymentForm={showPaymentForm}
						onSave={this.handleShippingSave}
						onEdit={this.handleShippingEdit}
						onSubmit={this.handleShippingSubmit}
					/> 

					{showPaymentForm && (
						<CheckoutStepPayment
							show={step === 3}
							title={text.payment}
							// inputClassName={checkoutInputClass}
							// buttonClassName={checkoutButtonClass}
							cart={cart}
							settings={settings}
							processingCheckout={processingCheckout}
							handleSuccessPayment={this.handleSuccessPayment}
							onCreateToken={this.handleCheckoutWithToken}
						/>
					)} 

            </Fragment>
		} else {
			return <p>{text.emptyCheckout}</p>;
		}
	}
}
