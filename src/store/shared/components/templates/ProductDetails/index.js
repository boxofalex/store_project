import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import Gallery from './Gallery';
import Price from './Price';
import Quantity from './Quantity';
import Attributes from './Attributes';
import AddToCartButton from './AddToCartButton';
import ProductInformation from './ProductInformation';
import * as helper from '../../../lib/helper';
import { getThemeSettings, getText } from '../../../lib/settings';


import styles from './ProductDetails.module.scss';



const ProductBreadcrumbs = ({ product, categories }) => {
    
    const text = getText();
   
	const items = helper.getProductBreadcrumbs(product, categories);

	let style = {
		paddingRight: '0.2rem'
	};
	
	return (
		<nav className={styles.productBreadcrumbs}>
			<ul>
				<li>
					<NavLink to="/" style={style}>{text.home}</NavLink>
					<span>&#47;</span>
				</li>
				{items}
			</ul>
		</nav>
	);
};


export default class ProductDetails extends Component {

    constructor(props) {
		super(props);
		this.state = {

			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1
		};

		this.onOptionChange = (optionId, valueId) => {

			let { selectedOptions } = this.state;

			if (valueId === '') {
				delete selectedOptions[optionId];
			} else {
				selectedOptions[optionId] = valueId;
			}

			this.setState({ selectedOptions: selectedOptions });
			this.findVariantBySelectedOptions();
			this.checkSelectedOptions();
		}

		this.findVariantBySelectedOptions = () => {

			const { selectedOptions } = this.state;
			const { product } = this.props;
			for (const variant of product.variants) {
				const variantMutchSelectedOptions = variant.options.every(
					variantOption =>
						selectedOptions[variantOption.option_id] === variantOption.value_id
				);
				if (variantMutchSelectedOptions) {
					this.setState({ selectedVariant: variant });
					return;
				}
			}

			this.setState({ selectedVariant: null });
		}

		this.setQuantity = (quantity) => {

			this.setState({ quantity: quantity });
		};

		this.addToCart = () => {

			const { product, addCartItem } = this.props;
			const { selectedVariant, quantity } = this.state;

			let item = {
				product_id: product.id,
				quantity: quantity
			};

			if (selectedVariant) {
				item.variant_id = selectedVariant.id;
			}

			addCartItem(item);
		}

		this.checkSelectedOptions = () => {
			const { selectedOptions } = this.state;
			const { product } = this.props;

			const allOptionsSelected =
				Object.keys(selectedOptions).length === product.options.length;
			this.setState({ isAllOptionsSelected: allOptionsSelected });
		}
    }
    

    render() {

        const { product, settings, categories, shippingMethods, loadShippingMethods } = this.props;
		const { selectedVariant, isAllOptionsSelected } = this.state;
		const maxQuantity = product.stock_quality;
		const text = getText();
		let stockStatus;

		if (product.stock_status === "available") {
		   
			stockStatus = text.available;     
		}

		const images = product && product.gallery ? product.gallery : product.image;
		
		
		// const maxQuantity = product.stock_status === 'discontinued' ? 0 : product.stock_backorder ? themeSettings.maxCartItemQty : selectedVariant
		// ? selectedVariant.stock_quantity : product.stock_quality;
		

        if (product) {
            return <Fragment>

				<div className={styles.categoryHero}>
                    <ProductBreadcrumbs product={product} categories={categories} />
                </div>

                <div className={styles.productMainArea}>

					<div className={styles.imageGalleryArea}>
						<div className={styles.gallery}>
							<Gallery images={images} />
						</div>
					</div>

					<div className={styles.productHandleArea}>

						<div className={styles.productTitle}>
							<h2>{product.name}</h2>
						</div>

						<div className={styles.stockStatus}>
							<h3>{stockStatus}</h3>
						</div>

						<div className={styles.productPrice}>
							<Price product={product} variant={selectedVariant} isAllOptionsSelected={isAllOptionsSelected} settings={settings} />
						</div>

						<div className={styles.addProduct}>

							<div className={styles.productQuantity}>
								<Quantity maxQuantity={maxQuantity} onChange={this.setQuantity}/>
							</div>

							<div className={styles.addCartButton}>
								<AddToCartButton product={product} variant={selectedVariant}
									addCartItem={this.addToCart} isAllOptionsSelected={isAllOptionsSelected}/>
							</div>
						</div>

					</div>
					
					<div className={styles.productDetails}>
					   
					   <ProductInformation product={product} shippingMethods={shippingMethods} loadShippingMethods={loadShippingMethods}/>
						
					</div>
                </div>
            </Fragment>

        } else {
			
            return null;
        }
    }
}