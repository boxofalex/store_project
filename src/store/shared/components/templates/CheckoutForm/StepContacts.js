import React, { Fragment, Component } from 'react';
import { Field, reduxForm, formValueSelector  } from 'redux-form';
import { connect } from 'react-redux'
import { getThemeSettings, getText } from '../../../lib/settings';
import { formatCurrency } from '../../../lib/helper';
import InputField from './InputField';

import styles from './StepContacts.module.scss';

const text = getText();

const validateRequired = value => {
	const text = getText();
	value && value.length > 0 ? undefined : text.required;
}
	

const validateEmail = value => {
	const text = getText();
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
	? text.emailInvalid
	: undefined;
}


const ReadOnlyField = ({ name, value }) => {
	return (
		<div>
			<div>{name}</div>
			<div>{value}</div>
		</div>
	);
};

class CheckoutStepContacts extends Component {

	constructor(props) {
        super(props);
        

	this.getField = fieldName => {
    
        const fields = this.props.checkoutFields || [];
        const field = fields.find(item => item.name === fieldName);
		return field;
	};

	this.getFieldStatus = fieldName => {
        const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	this.isFieldOptional = fieldName => {
		return this.getFieldStatus(fieldName) === 'optional';
	};

	this.isFieldHidden = fieldName => {
		return this.getFieldStatus(fieldName) === 'hidden';
	};

	this.getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}

		return validatorsArray;
	};

	this.getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	this.getFieldLabelText = fieldName => {
        const text = getText();

        const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		} else {
			switch (fieldName) {
				case 'email':
					return text.email;
					break;
				case 'mobile':
					return text.mobile;
					break;
				case 'country':
					return text.country;
					break;
				case 'state':
					return text.state;
					break;
				case 'city':
					return text.city;
					break;
				default:
					return 'Unnamed field';
			}
		}
	};

	this.getFieldLabel = fieldName => {
        const text = getText();
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName)
			? `${labelText} (${text.optional})`
			: labelText;
	};


	}

	render() {
		const {
			onSubmit,
			handleSubmit,
			// pristine,
			// invalid,
			// valid,
			// reset,
			// submitting,
			loadingShippingMethods,
			loadingPaymentMethods,
			// initialValues,
			settings,
			saveShippingLocation,
			saveShippingMethod,
			savePaymentMethod,
			paymentMethods,
			shippingMethods,
			onEdit,
			isReadOnly,
			title,
			emailValue,
			mobileValue,
			shippingAddressCountry,
			shippingAddressState,
			shippingAddressCity,
			shippingMethod,
			paymentMethod
		} = this.props;
		

        const text = getText();

		if (isReadOnly) {
			return (
				<div className={styles.contactsArea}>
					<h1> <span>1</span> {title} </h1>
 
					{!this.isFieldHidden('email') && (
						<ReadOnlyField name={text.email} value={emailValue} />
					)}
					{!this.isFieldHidden('mobile') && (
						<ReadOnlyField name={text.mobile} value={mobileValue} />
					)}
					{!this.isFieldHidden('country') && (
						<ReadOnlyField
							name={text.country}
							value={shippingAddressCountry}
						/>
					)}
					{!this.isFieldHidden('state') && (
						<ReadOnlyField
							name={text.state}
							value={shippingAddressState}
						/>
					)}
					{!this.isFieldHidden('city') && (
						<ReadOnlyField
							name={text.city}
							value={shippingAddressCity}
						/>
					)} 
					<ReadOnlyField
						name={text.shippingMethod}
						value={shippingMethod}
					/>
					<ReadOnlyField
						name={text.paymentMethod}
						value={paymentMethod}
					/>  

					<div>
						<button type="button" onClick={onEdit}>
							{text.edit}
						</button>
					</div>
				</div>
			);
		} else {
           
			return (
				<div className={styles.contactsArea}>
					<h2>
						<span>1</span>
						{title}
					</h2>
					<form onSubmit={handleSubmit} className={styles.contactsForm}>
						{!this.isFieldHidden('email') && (
							<Field
								// className={inputClassName}
								name="email"
								id="customer.email"
								component={InputField}
								type="email"
								label={this.getFieldLabel('email')}
								validate={this.getFieldValidators('email')}
								placeholder={this.getFieldPlaceholder('email')}
							/>
						)}

						{!this.isFieldHidden('mobile') && (
							<Field
								// className={inputClassName}
								name="mobile"
								id="customer.mobile"
								component={InputField}
								type="tel"
								label={this.getFieldLabel('mobile')}
								validate={this.getFieldValidators('mobile')}
								placeholder={this.getFieldPlaceholder('mobile')}
							/>
						)}

						<h3>{text.shippingTo}</h3>

						{!this.isFieldHidden('country') && (
							<Field
								// className={inputClassName}
								name="shipping_address.country"
								id="shipping_address.country"
								component={InputField}
								type="text"
								label={this.getFieldLabel('country')}
								validate={this.getFieldValidators('country')}
								placeholder={this.getFieldPlaceholder('country')}
								onBlur={(event, value) =>
									setTimeout(() => saveShippingLocation({ country: value }))
								}
							/>
						)}

						{!this.isFieldHidden('state') && (
							<Field
								// className={inputClassName}
								name="shipping_address.state"
								id="shipping_address.state"
								component={InputField}
								type="text"
								label={this.getFieldLabel('state')}
								validate={this.getFieldValidators('state')}
								placeholder={this.getFieldPlaceholder('state')}
								onBlur={(event, value) =>
									setTimeout(() => saveShippingLocation({ state: value }))
								}
							/>
						)}

						{!this.isFieldHidden('city') && (
							<Field
								// className={inputClassName}
								name="shipping_address.city"
								id="shipping_address.city"
								component={InputField}
								type="text"
								label={this.getFieldLabel('city')}
								validate={this.getFieldValidators('city')}
								placeholder={this.getFieldPlaceholder('city')}
								onBlur={(event, value) =>
									setTimeout(() => saveShippingLocation({ city: value }))
								}
							/>
						)}

						<h3>
							{text.shippingMethods}{' '}
							{loadingShippingMethods && <small>{text.loading}</small>}
						</h3>
 						<div className={styles.shippingArea}>
 							{shippingMethods.map((method, index) => (
 								<label key={index} className={styles.shippingOption}>
									<Field
									className={styles.radioButton} 					name="shipping_method_id" 						component="input"
 									type="radio"
 									value={method.name}
 									onClick={() => saveShippingMethod(method.id, method.name)}
 									/>
 									<div className={styles.optionDescription}>
 										<div >{method.name}</div>
 										<div >
 											{method.description}
										</div>
 									</div>
 									<span className={styles.optionPrice}>
 										{formatCurrency(method.price, settings)}
 									</span>
 								</label>
 							))}
 						</div> 

						<h3>
							{text.paymentMethods}{' '}
							{loadingPaymentMethods && <small>{text.loading}</small>}
						</h3>
						<div className={styles.paymentArea}>
							{paymentMethods.map((method, index) => (
								<label key={index} className={styles.paymentOption}>
									<Field
									    className={styles.radioButtonForPayment} 	
										name="payment_method_id"
										validate={[validateRequired]}
										component="input"
										type="radio"
										value={method.name}
										onClick={() => savePaymentMethod(method.id)}
									/>
									<div className={styles.optionDescriptionForPayment}>
										<div >{method.name}</div>
										<div >
											{method.description}
										</div>
									</div>
								</label>
							))}
						</div> 
						<div  className={styles.submitButton}>
							<button type="submit" 
							// disabled={invalid}
							>
								{text.next}
							</button>
						</div>
					</form>
				</div>
			);
		}
	}
}

CheckoutStepContacts = reduxForm({
	form: 'CheckoutStepContacts',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(CheckoutStepContacts);

const selector = formValueSelector('CheckoutStepContacts');

CheckoutStepContacts = connect (
	state => {
		const emailValue = selector(state, 'email')
		const mobileValue = selector(state, 'mobile')
		const shippingAddressCountry = selector(state, 'shipping_address.country')
		const shippingAddressState = selector(state, 'shipping_address.state')
		const shippingAddressCity = selector(state, 'shipping_address.city')
		const shippingMethod = selector(state, 'shipping_method_id')  
		const paymentMethod = selector(state, 'payment_method_id')

		return {
			emailValue,
			mobileValue,
			shippingAddressCountry,
			shippingAddressState,
			shippingAddressCity,
			shippingMethod,
			paymentMethod
		}
	}
)(CheckoutStepContacts);

export default CheckoutStepContacts;

