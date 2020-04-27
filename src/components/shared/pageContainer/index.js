import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navigation from '../navigation';

const styles = () => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    zIndex: 1100,
    flexShrink: 0,
    width: '100%',
  },
  content: {
    flexGrow: 1,
    maxWidth: 1360,
    minHeight: '100vh',
    paddingTop: '60px',
    margin: '0 auto',
  },
});

class PageContainer extends PureComponent {
  render() {
    const {
      children,
      country,
      classes,
      setCountry,
      disabledButtons,
    } = this.props;

    return (
      <div id="pageContainer" className={classes.root}>
        <Navigation
          country={country}
          setCountry={setCountry}
          disabledButtons={disabledButtons}
        />
        <div className={classes.content}>{children}</div>
      </div>
    );
  }
}

PageContainer.defaultProps = {
  disabledButtons: false,
  setCountry: () => {},
};

PageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func,
  disabledButtons: PropTypes.bool,
};

export default withStyles(styles)(PageContainer);
