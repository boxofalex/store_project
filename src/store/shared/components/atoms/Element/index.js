import React, { Fragment } from 'react';


const HTMLel = (props) => {

    let Tag = props.tag ? props.tag : ''; 
    let children = props.children ? props.children : '';
    let text = props.text ? props.text : '';
    let classes = props.classes ? props.classes : '';
    let items;

    if (children) {

        items = <Fragment>
            <Tag className={[...classes].join(' ')}>
               {children}
            </Tag>
        </Fragment>
    } else {

        items = <Fragment>
            <Tag className={[...classes].join(' ')}>
               {text}
            </Tag>
        </Fragment>
    }

    return items;
}

export default HTMLel;