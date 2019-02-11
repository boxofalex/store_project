import React, { Component, Fragment } from 'react';



const withDimensions = (WrappedContainer) => {

    return class extends Component {
    
    constructor(props){
        super(props);

        this.state = {

            width: 0,
            height: 0
        };

        this.updateWindowDimensions = () => {

            this.setState({ width: window.innerWidth, height: window.innerHeight });
        };
    }
   

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {

        window.removeEventListener("resize", this.updateWindowDimensions);
    }


    render() {

        return (
            <WrappedContainer {...this.props} isMobile={ this.state.width < 959 }/>
        )
    }

  }

}


export default withDimensions;


