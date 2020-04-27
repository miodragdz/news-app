import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import BrokenImage from '@material-ui/icons/BrokenImage';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const styles = () => ({
  main: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: '30vh',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSize: {
    width: 120,
    height: 120,
  },
  avatarSection: {
    marginBottom: '1em',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    backgroundColor: 'coral',
  },
  link: {
    color: '#41525B',
    fontSize: '14px',
    lineHeight: '17px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
    '&:hover': {
      color: 'coral',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  text: {
    color: '#41525B',
  },
});

class PageNotFound extends PureComponent {
  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.avatarSection}>
          <Avatar className={classes.avatar}>
            <BrokenImage className={classes.iconSize} />
          </Avatar>
        </div>
        <Typography variant="h1" gutterBottom className={classes.text}>
          Page Not Found
        </Typography>
        <button
          type="button"
          className={classes.link}
          onClick={() => history.push('/')}
        >
          Go home
        </button>
      </div>
    );
  }
}

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PageNotFound));
