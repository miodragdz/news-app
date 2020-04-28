import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { countryArray } from '../../../constants/countries';

const styles = () => ({
  main: {
    display: 'flex',
    position: 'fixed',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '60px',
    width: '100%',
    border: '1px solid #41525B',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    height: '60px',
    width: '100%',
  },
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '150px',
    minWidth: '100px',
    color: '#41525B',
    textDecoration: 'none',
    fontSize: '18px',
    borderRight: '1px solid #41525B',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    height: '60px',
    width: '100%',
  },
  buttonItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '60px',
    minWidth: '60px',
    color: '#41525B',
    fontSize: '18px',
    borderLeft: '1px solid #41525B',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  activeButtonItem: {
    color: 'white',
    backgroundColor: '#41525B',
  },
  active: {
    color: 'white',
    backgroundColor: '#41525B',
  },
  disabledButton: {
    backgroundColor: 'coral',
    cursor: 'default',
  },
});

class Navigation extends PureComponent {
  render() {
    const { classes, country, setCountry, disabledButtons } = this.props;

    return (
      <div className={classes.main}>
        <div className={classes.links}>
          <NavLink
            to="/topNews"
            className={classes.linkItem}
            activeClassName={classes.active}
          >
            Top news
          </NavLink>
          <NavLink
            to="/categories"
            className={classes.linkItem}
            activeClassName={classes.active}
          >
            Categories
          </NavLink>
          <NavLink
            to="/search"
            className={classes.linkItem}
            activeClassName={classes.active}
          >
            Search
          </NavLink>
        </div>
        <div className={classes.buttons}>
          {countryArray.map(item => {
            return (
              <div
                key={item}
                className={classNames(classes.buttonItem, {
                  [classes.activeButtonItem]: country === item,
                  [classes.disabledButton]: disabledButtons,
                })}
                onClick={
                  country === item || disabledButtons
                    ? () => {}
                    : () => setCountry(item)
                }
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Navigation.defaultProps = {
  disabledButtons: false,
  setCountry: () => {},
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  disabledButtons: PropTypes.bool,
  setCountry: PropTypes.func,
};

export default withRouter(withStyles(styles)(Navigation));
