import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { getText, getThemeSettings } from '../../../lib/settings';
import AttributeFilter from './AttributeFilter';
import PriceSlider from './PriceSlider';
import Sort from '../Sort';


import styles from './ProductFilter.module.scss';

export default class ProductFilter extends Component {

    constructor(props) {
		super(props);
		this.state = {
			sidebarIsActive: false
        };
        
        this.sidebarToggle = () => {
            this.setState({
                sidebarIsActive: !this.state.sidebarIsActive
            });
            document.body.classList.toggle('noscroll');
        };
    
        this.sidebarClose = () => {
            this.setState({ sidebarIsActive: false });
            document.body.classList.remove('noscroll');
        };
    }

    componentDidMount() {
     
    }
	
    render () {

        const { sidebarIsActive } = this.state;
		const {
			categoryDetails,
			categories,
			settings,
			productFilter,
			productsMinPrice,
			productsMaxPrice,
            productsAttributes,
            isMobile,
        } = this.props.state;

        
        const text = getText();
        const themeSettings = getThemeSettings();
        const general = themeSettings.general;

        return <Fragment>
            <div className={styles.productFilterArea}>
                <div className={[styles.filterProductsButton, !this.props.isMobile ? styles.hidden : ''].join(' ')}>
                    <button onClick={this.sidebarToggle}>
                       {text.filterProducts}
                    </button>
                </div>
                <div className={styles.modalArea}>
                    <div className={this.state.sidebarIsActive ? styles.darken : ''}
						onClick={this.sidebarClose}/>
                    <div className={[styles.sortFilterArea, this.state.sidebarIsActive ? styles.active : ''].join(' ')}>
                       <div className={[styles.sortProducts, !this.props.isMobile ? styles.hidden : ''].join(' ')}>
                           <Sort defaultSort={settings.default_product_sorting} currentSort={productFilter.sort} setSort={this.props.setSort}/>
                       </div>
                       <div className={styles.attributeFilter}>
                           <h2>Filters</h2>
                           <AttributeFilter 
                                attributes={productsAttributes}
								setFilterAttribute={this.props.setFilterAttribute}
								unsetFilterAttribute={this.props.unsetFilterAttribute}/>
                       </div>
                       <div className={styles.priceSlider}>
                           <PriceSlider 
                              minPrice={productsMinPrice}
                              maxPrice={productsMaxPrice}
                              minValue={productFilter.priceFrom}
                              maxValue={productFilter.priceTo}
                              setPriceFromAndTo={this.props.setPriceFromAndTo}
                              settings={settings}
                           />
                       </div>
                       <span className={[styles.closeButton, !this.props.isMobile ? styles.hidden : ''].join(' ')} onClick={this.sidebarClose}>
                                <img src={general.icons.close}/>
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    }
}

