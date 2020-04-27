import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => ({
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pageTitleContainer: {
    paddingTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textClassName: {
    fontSize: '36px',
    color: '#41525B',
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '20px',
  },
  titlePoint: {
    border: `1px solid '#41525B'`,
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#41525B',
    marginLeft: 32,
    marginRight: 12,
    cursor: 'pointer',
    flexShrink: 0,
  },
  backButton: {
    cursor: 'pointer',
    color: '#41525B',
  },
  image: {
    height: 500,
    marginBottom: 30,
  },
  content: {
    textAlign: 'left',
    padding: '0 100px 40px',
  },
});

class ArticlePage extends PureComponent {
  backToList = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { classes, location } = this.props;
    const { title, urlToImage, content } = location.state.article;

    return (
      <Fragment>
        <div className={classes.main}>
          <Grid container spacing={0}>
            <Grid item xs={12} className={classes.pageTitleContainer}>
              <div className={classes.title}>
                <Typography variant="h1" className={classes.textClassName}>
                  {title ? title : 'No title'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <img src={urlToImage} alt="article" className={classes.image} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.content}>
                {content ? content : 'No content'}
              </Typography>
            </Grid>
          </Grid>
          <Button
            size="small"
            color="primary"
            onClick={this.backToList}
            className={classes.backButton}
          >
            {`< Back to list`}
          </Button>
        </div>
      </Fragment>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticlePage);
