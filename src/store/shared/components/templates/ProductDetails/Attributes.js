import React, { Fragment } from 'react';
import { getThemeSettings, getText } from '../../../lib/settings';


import styles from './Attributes.module.scss';



const Attribute = ({ name, value }) => (

	<div className={styles.attribute}>
		<div className={styles.attributeName}>{name}:</div>
		<div className={styles.attributeValue}>{value}</div>
	</div>
);

const Attributes = ({ attributes }) => {
    
    const text = getText();

	if (attributes && attributes.length > 0) {
		const items = attributes.map((attribute, index) => (
			<Attribute key={index} name={attribute.name} value={attribute.value} />
		));

		return <Fragment>
               <div className={styles.attributesTitle}> 
                   {text.attributes} 
                </div>
				{items}
        </Fragment>
            
	} else {
		return null;
	}
};



export default Attributes;
