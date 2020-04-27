import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '../../../assets/icons/search.svg';

const styles = () => ({
  main: {
    maxWidth: 410,
  },
  searchRoot: {
    backgroundColor: '#F5F7F8',
    borderRadius: '27.5px',
    border: 0,
    fontSize: 14,
    lineHeight: '17px',
    padding: '11.5px 19px',
    boxSizing: 'border-box',
    '&$focused': {
      border: 'none',
    },
  },
  focused: {},
  input: {
    padding: 0,
    color: '#41525B',
  },
});

class Search extends PureComponent {
  inputTimer = null;

  onChange = event => {
    const { onChange } = this.props;
    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(onChange.bind(this, event.target.value), 1000);
  };

  renderAdornment = () => {
    return (
      <InputAdornment position="end">
        <img src={SearchIcon} alt="Search" />
      </InputAdornment>
    );
  };

  render() {
    const { classes, className, disabled } = this.props;
    return (
      <div className={classNames(classes.main, className)}>
        <TextField
          placeholder="Search"
          onChange={this.onChange}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.searchRoot,
              input: classes.input,
              focused: classes.focused,
            },
            endAdornment: this.renderAdornment(),
          }}
          disabled={disabled}
          fullWidth
        />
      </div>
    );
  }
}

Search.defaultProps = {
  className: '',
  disabled: false,
};

Search.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(Search);
