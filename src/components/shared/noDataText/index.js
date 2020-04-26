import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  noData: {
    fontStyle: 'italic',
    color: '#41525B',
    lineHeight: '19px',
    opacity: 0.5,
    paddingLeft: '80px',
  },
});

class NoDataText extends PureComponent {
  render() {
    const { classes, className, text } = this.props;

    return <div className={classNames(classes.noData, className)}>{text}</div>;
  }
}

NoDataText.defaultProps = {
  className: '',
};

NoDataText.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(NoDataText);
