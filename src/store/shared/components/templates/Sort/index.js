import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getText, getThemeSettings } from '../../../lib/settings';

import styles from './Sort.module.scss';


class Sort extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            selectedOption: null,
        }

        this.handleChange = (selectedOption) => {
             this.props.setSort(selectedOption.value);
          }
    }

  render() {

    const text = getText();
    const themeSettings = getThemeSettings();
    const sort = themeSettings.sort;
    
    const { defaultSort, currentSort, setSort } = this.props;

    const { selectedOption } = this.state;

    const options = [
        { value: defaultSort, label: text.sortFavorite },
        { value: sort.sortNewest, label: text.sortNewest },
        { value: sort.sortPriceLow, label: text.sortPriceLow },
        { value: sort.sortPriceHigh, label: text.sortPriceHigh }
      ];

    return <Fragment>
        <div className={styles.sortForm}>
            <h2>{text.sort}</h2>
            <Select value={selectedOption} onChange={this.handleChange} options={options}/>
        </div>
    </Fragment>
  }
}

export default Sort;