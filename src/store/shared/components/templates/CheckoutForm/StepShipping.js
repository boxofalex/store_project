import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { getThemeSettings, getText } from '../../../lib/settings';
import InputField from './InputField';
import TextareaField from './TextareaField';


import styles from './StepShipping.module.scss';


const LOAD = 'loadData';

const reducer = (state = {}, action) => {
	switch (action.type) {
	  case LOAD:
		return {
		  data: action.data
		}
	  default:
		return state
	}
}

const validateRequired = value => {

	const text = getText();
	value && value.length > 0 ? undefined : text.required;
}


const getFieldLabelByKey = key => {
	const text = getText();
	switch (key) {
		case 'full_name':
			return text.fullName;
		case 'address1':
			return text.address1;
		case 'address2':
			return text.address2;
		case 'postal_code':
			return text.postal_code;
		case 'phone':
			return text.phone;
		case 'company':
			return text.company;
		default:
			return '';
	}
};

const getFieldLabel = key => {

	const label = getFieldLabelByKey(key);
	return label;
};

class CheckoutStepShipping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			billingAsShipping: true
		};

		this.onChangeBillingAsShipping = event => {
			this.setState({
				billingAsShipping: event.target.checked
			});
		};

	}

	

	render() {
		const {
			pristine,
			invalid,
			valid,
			reset,
			cart,
			submitting,
			handleSubmit,
			processingCheckout,
			initialValues,
			// shippingMethod,
			checkoutFields,
			saveShippingLocation,
			settings,
			inputClassName,
			buttonClassName,
			editButtonClassName,
			title,
			show,
			isReadOnly,
			showPaymentForm,
			onEdit
		} = this.props;


		const text = getText();

		const hideBillingAddress = settings.hide_billing_address === true;
		const commentsField = checkoutFields.find(f => f.name === 'comments');
		const commentsFieldPlaceholder =
			commentsField &&
			commentsField.placeholder &&
			commentsField.placeholder.length > 0
				? commentsField.placeholder
				: '';
		const commentsFieldLabel =
			commentsField && commentsField.label && commentsField.label.length > 0
				? commentsField.label
				: text.comments;
		const commentsFieldStatus =
			commentsField && commentsField.status.length > 0
				? commentsField.status
				: null;
		const commentsValidate =
			commentsFieldStatus === 'required' ? validateRequired : null;
		const hideCommentsField = commentsFieldStatus === 'hidden';

		if (!show) {
			return (
				<div className={styles.shippingArea}>
					<h2 className={styles.shippingAreaTitle}>
						<span>2</span>
						{title}
					</h2>
				</div>
			);
		} else if (isReadOnly) {
			let shippingFields = null;
			if (
				cart.shipping_address !== undefined
			) {
				shippingFields = Object.keys(cart.shipping_address).map( (key, index) => {

					const fieldLabel = getFieldLabel(key);
					const fieldValue = cart.shipping_address[key];
					
					if (fieldLabel) {
						return (
							<div key={index}>
								<div >{fieldLabel}</div>
								<div >{fieldValue}</div>
							</div>
						);
					}

					return
				
				});
			}

			return (
				<div className={styles.shippingArea}>
					<h2 className={styles.shippingAreaTitle}>
						<span>2</span>
						{title}
					</h2>
					{shippingFields}

					{!hideCommentsField &&
						cart.comments !== '' && (
							<div >
								<div >{commentsFieldLabel}</div>
								<div >{cart.comments}</div>
							</div>
						)}

					<div>
						<button type="button" onClick={onEdit} >
							{text.edit}
						</button>
					</div>
				</div>
			);
		} else {
			let shippingFields = null;
			if (
				cart.shipping_address !== undefined
			
			) {
			
				shippingFields = Object.keys(cart.shipping_address).map((key, index) => {

					const fieldLabel = getFieldLabel(key);
					const fieldId = `shipping_address.${key}`;
					
					if (fieldLabel) {

						return (
							<Field
								key={index}
								name={fieldId}
								id={fieldId}
								component={InputField}
								type="text"
								label={fieldLabel}
							/>
						);
					}
			        return 
				     
				});
			}

			return (
				<div className={styles.shippingArea}>
					<h2 className={styles.shippingAreaTitle}>
						<span>2</span>
						{title}
					</h2>
					<form onSubmit={handleSubmit}>
						{shippingFields}

						{!hideCommentsField && (
							<Field
								name="comments"
								id="comments"
								component={TextareaField}
								type="text"
								label={commentsFieldLabel}
								placeholder={commentsFieldPlaceholder}
								validate={commentsValidate}
								rows="3"
							/>
						)}

						{!hideBillingAddress && (
							<div className={styles.sameAsBilling}>
								<h3 className={styles.sameAsBillingTitle}>{text.billingAddress}</h3>
								<div className={styles.sameAsBillingForm}>
									<input
									className={styles.sameAsBillingFormInput}
										id="billingAsShipping"
										type="checkbox"
										onChange={this.onChangeBillingAsShipping}
										checked={this.state.billingAsShipping}
									/>
									<label className={styles.sameAsBillingFormLabel} htmlFor="billingAsShipping">
										{text.sameAsShipping}
									</label>
								</div>

								{!this.state.billingAsShipping && (
									<div className={styles.shippingAdress}>
										<Field
											name="billing_address.full_name"
											id="billing_address.full_name"
											component={InputField}
											type="text"
											label={text.fullName}
											validate={[validateRequired]}
										/>
										<Field

											name="billing_address.address1"
											id="billing_address.address1"
											component={InputField}
											type="text"
											label={text.address1}
											validate={[validateRequired]}
										/>
										<Field
											name="billing_address.address2"
											id="billing_address.address2"
											component={InputField}
											type="text"
											label={text.address2 + ` (${text.optional})`}
										/>
										<Field
											name="billing_address.postal_code"
											id="billing_address.postal_code"
											component={InputField}
											type="text"
											label={text.postal_code + ` (${text.optional})`}
										/>
										<Field
											name="billing_address.phone"
											id="billing_address.phone"
											component={InputField}
											type="text"
											label={text.phone + ` (${text.optional})`}
										/>
										<Field
											name="billing_address.company"
											id="billing_address.company"
											component={InputField}
											type="text"
											label={text.company + ` (${text.optional})`}
										/>
									</div>
								)}
							</div>
						)}

						<div>
							<button type="submit"
								disabled={submitting || processingCheckout || invalid}
							>
								{showPaymentForm ? text.next : text.orderSubmit}
							</button>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default reduxForm({
	form: 'CheckoutStepShipping',
	enableReinitialize: true,
	keepDirtyOnReinitialize: false
})(CheckoutStepShipping);
