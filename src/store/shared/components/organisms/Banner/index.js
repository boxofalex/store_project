import React, { Fragment } from 'react';

import styles from './Banner.module.scss';


const Banner = (props) => {


    let imageStyle = {

        backgroundImage: 'url(' + props.sourceImg  + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    };

    let children = props.children ? props.children : '';

    return <Fragment>
       <div className={[styles.banner, props.class].join(' ')} style={imageStyle}>
               {children}
       </div>
    </Fragment>
}

export default Banner;