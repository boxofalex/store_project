import React, { Fragment } from 'react';


const List = (props) => {

    let children = props.children ? props.children : '';
    let classesForListTag = props.classes && props.classes[0] ? props.classes[0] : '';
    let classesForLiTags = props.classes && props.classes[1] ? props.classes[1] : '';
    let items;

    items = <ul className={classesForListTag}>
                { React.Children.map(children, (child, i) => {
                    return <li className={classesForLiTags}>{child}</li>
                })}</ul>

    
    return items
   
}

export default List;