import React, { Fragment, Component } from 'react';
import * as helper from '../../../lib/helper';
import { getThemeSettings, getText } from '../../../lib/settings';
import Tabs from './Tabs';


import styles from './ProductInformation.module.scss';


class ProductInformation extends Component {
    
    constructor(props){
        super(props)

    }

    render() {

        const { product, shippingMethods, loadShippingMethods} = this.props;
        const themeSettings = getThemeSettings();
        const general = themeSettings.general;
        const text = getText();
        
        return <Fragment>
           <Tabs itemsClass={styles.productInformation} activeClass={styles.activeTab} blockClass={styles.block}> 
                <div label={text.productInfo}>
                    {product.description}
                </div>
                <div label={text.deliveryInfo}>
                    {general.text.deliveryInfo}
                </div>
                <div label={text.returnsInfo}>
                    {general.text.returnsInfo}
                </div>
           </Tabs>
        </Fragment>
    }
}



export default ProductInformation;