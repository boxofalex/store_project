import React, { Fragment } from 'react';

import styles from './BurgerMenu.module.scss';

const BurgerMenu = (props) => {

    let onClickAction = props.onClickAction ? props.onClickAction : '';
    let containerClass = props.classes && props.classes[0] ? props.classes[0] : '';
    let topBarClass = props.classes && props.classes[1] ?  props.classes[1] : '';
    let middleBarClass = props.classes && props.classes[2] ?  props.classes[2] : '';
    let bottomBarClass = props.classes && props.classes[3] ?  props.classes[3] : '';
    let isRotate = props.isRotate ? props.isRotate : '';
    
    return <Fragment>
       <div className={[styles.container, containerClass, isRotate ?  styles.rotate : ''].join(' ')} onClick={onClickAction}>
            <div className={[styles.top ,topBarClass].join(' ')}></div>
            <div className={[styles.middle, middleBarClass].join(' ')}></div>
            <div className={[styles.bottom, bottomBarClass].join(' ')}></div>
       </div>
       
    </Fragment>

}

export default BurgerMenu;