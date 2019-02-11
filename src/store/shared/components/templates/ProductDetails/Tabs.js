import React, { Fragment, Component } from 'react';


class Tab extends Component {
     
    constructor(props){
        super(props)
        

    this.onClick = () => {

        const { label, onClick } = this.props;
        onClick(label);
       }
    }
  
  
    render() {
      const { 
        onClick,
        props: {
          activeTab,
          label,
          activeClass
        },
      } = this;
  
   
      return (
        <li className={activeTab === label ? activeClass : ''} onClick={onClick} >
          {label}
        </li>
      );
    }
  }


class TabItems extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        activeTab: this.props.children[0].props.label,
      };

      this.onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
      }
    }
  
    render() {

      const {
        onClickTabItem,
        props: {
          children,
          activeClass,
          itemsClass,
          blockClass
        },
        state: {
          activeTab,
        }
      } = this;
  
      return <Fragment>

        <ul className={itemsClass}>

            {children.map((child) => {
            const { label } = child.props;

            return (
                <Tab
                activeTab={activeTab}
                activeClass={activeClass}
                key={label}
                label={label}
                onClick={onClickTabItem}
                />
            );
            })}
        </ul>

        <div className={blockClass}>
            {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
            })}
        </div>
    </Fragment>
    }
}




const Tabs = (props) => {

const { children, activeClass, itemsClass, blockClass } = props;

return <Fragment>

    <TabItems activeClass={activeClass} itemsClass={itemsClass} blockClass={blockClass}>
        {children}
    </TabItems>
   </Fragment>
}


export default Tabs;

