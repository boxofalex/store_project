import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getThemeSettings, getText } from '../../../lib/settings';

import styles from './Footer.module.scss';


class FooterMenuItem extends Component {


    constructor(props) {
		super(props);
		this.state = {
			isActive: false
        };
        
	    this.isActiveToggle = () => {
            this.setState({
                isActive: !this.state.isActive
            });
	    };
    };

    render() {
        const {
           title,
           items,
           text
        } = this.props;

        
        const ulItems = Object.entries(items).map(([item, details]) => {
             
            return <li key={item}>
                 <NavLink to={details.link || ''}>
                       {text[details.name]}
                 </NavLink>
            </li>
        })

        return <div className={styles.footerMenuItem}>
            <div>{text[title]}</div>
            <ul >{ulItems}</ul>
        </div>
    }
}

const SocialIcons = (props) => {

    const {
        text,
        socialMedia
    } = props;

    const items = Object.entries(socialMedia.items).map(([item, details]) => {

          return <NavLink key={item} to={details.link}>
              <img src={details.icon}/>
          </NavLink>
    });

    return <div className={props.class}>
        {items}
    </div>
}



class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            hasFocus: false
        };

        this.handleChange = event => {
            this.setState({ value: event.target.value });
        };
    }

    render() {

        const {
          signUpForm,
          text
        } = this.props;

        return <div className={styles.signUpArea}>
            <input
                className={styles.signUpInput}
                type="text"
                placeholder={signUpForm.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
			/>
            <span className={styles.signUpButton}>
                <img src={signUpForm.icon} />
            </span>     
        </div>
    }
}







class Footer extends Component {

    render() {

        const themeSettings = getThemeSettings();
        const footer = themeSettings.footer;
        const companyNavigation = footer.footerNavigation.company;
        const customerServiceNavigation = footer.footerNavigation.customerService;
        const socialMedia = footer.socialMedia;
        const signUpForm = footer.signUpForm;
        const copyright = footer.copyright;
        const text = getText();

        return <Fragment>
            <section className={styles.footer}>
                <div className={styles.footerMenu}>
                    <FooterMenuItem title={companyNavigation.title} items={companyNavigation.items} text={text}/>
                    <FooterMenuItem title={customerServiceNavigation.title} items={customerServiceNavigation.items} text={text}/>
                </div>
                <div className={styles.socialSignUp}>
                    <div className={styles.socialMedia}>
                       <span className={styles.socialMediaTitle}>{text[socialMedia.title]}</span>
                       <SocialIcons class={styles.socialMediaIcons} text={text} socialMedia={socialMedia}/>
                    </div>
                    <SignUpForm signUpForm={signUpForm} text={text}/>
                </div>
                <div className={styles.copyright}>
                    <p>{text[copyright]}</p>
                </div>
            </section>
        </Fragment>
    }
}


    


export default Footer;