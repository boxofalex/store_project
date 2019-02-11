import React, { Fragment, Component } from 'react';

import styles from './SearchBox.module.scss';



class SearchBox extends Component {

        constructor(props) {
            super(props);
            this.state = {
                value: props.value,
                hasFocus: false
            };
            
        this.handleChange = event => {
            this.setState({ value: event.target.value });
        };

        this.handleKeyPress = e => {
            if (e.keyCode === 13 || e.which === 13) {
                this.handleSearch();
            }
        };

        this.handleKeyDown = e => {
            if (e.keyCode === 27) {
                this.handleClear();
            }
        };

        this.handleSearch = () => {
            this.props.onSearch(this.state.value);
        };

        this.handleClear = () => {
            this.setState({ value: '' });
            this.props.onSearch('');
        };

        this.handleFocus = () => {
            this.setState({ hasFocus: true });
        };

        this.handleBlur = () => {
            this.setState({ hasFocus: false });
        };
    }
    
    render() {
        
        const { hasFocus, value } = this.state;
        const { text, icons, mobileSearchIsActive } = this.props;
        const placeholderText = text.search;

    
        return <div className={[styles.searchBar, hasFocus ? styles.hasFocus : '', mobileSearchIsActive ? styles.active : ''].join(' ')}>

            <input
                className={styles.searchInput}
                type="text"
                placeholder={placeholderText}
                value={this.state.value}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
			/>
            <span className={styles.searchButton} onClick={this.handleSearch}>
                <img src={icons.search} alt={text.search} title={text.search} />
            </span>
        

        </div>
    }
}

export default SearchBox;

