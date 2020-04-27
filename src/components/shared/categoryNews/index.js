import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NewsCard from '../newsCard';
import NoDataText from '../noDataText';

import { isArrayEmpty, generateUniqueString } from '../../../utility/helpers';

const styles = () => ({
  main: {
    marginBottom: '30px',
  },
  arrow: {
    fontSize: '2rem',
    marginLeft: '30px',
    display: 'flex',
    alignItems: 'center',
    color: '#41525B',
  },
  arrowStyle: {
    cursor: 'pointer',
  },
  pageTitleContainer: {
    paddingTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textClassName: {
    fontSize: '28px',
    textTransform: 'capitalize',
    color: '#41525B',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '20px',
  },
  titlePoint: {
    border: `1px solid '#41525B'`,
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#41525B',
    marginLeft: 32,
    marginRight: 12,
    cursor: 'pointer',
    flexShrink: 0,
  },
  carousel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselLeft: {
    fontSize: '2rem',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#41525B',
    cursor: 'pointer',
  },
  carouselRight: {
    fontSize: '2rem',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#41525B',
    cursor: 'pointer',
  },
  carouselDisabled: {
    color: '#9BB1BB',
    cursor: 'default',
  },
  expanded: {
    paddingLeft: 52,
    paddingRight: 52,
  },
});

class CategoryNews extends PureComponent {
  state = {
    opened: false,
    first: 0,
    last: 2,
  };

  toggle = () =>
    this.setState(prevState => {
      return { opened: !prevState.opened };
    });

  moveRight = () =>
    this.setState(prevState => {
      return { first: prevState.first + 1, last: prevState.last + 1 };
    });

  moveLeft = () =>
    this.setState(prevState => {
      return { first: prevState.first - 1, last: prevState.last - 1 };
    });

  render() {
    const {
      classes,
      category,
      articles,
      toCategoryPage,
      goToArticle,
    } = this.props;
    const { opened, first, last } = this.state;

    return (
      <Fragment>
        <div className={classes.main}>
          <Grid item xs={12} className={classes.pageTitleContainer}>
            <div className={classes.title}>
              <div className={classes.titlePoint} />
              <Typography
                variant="h3"
                onClick={toCategoryPage}
                className={classes.textClassName}
              >
                {`${category}`}
              </Typography>
              <div className={classes.arrowStyle} onClick={this.toggle}>
                {opened ? (
                  <ExpandLessIcon classes={{ root: classes.arrow }} />
                ) : (
                  <ExpandMoreIcon classes={{ root: classes.arrow }} />
                )}
              </div>
            </div>
          </Grid>
          <Grid item container spacing={3} xs={12}>
            {!isArrayEmpty(articles) && (
              <Fragment>
                {!opened && (
                  <div className={classes.carousel}>
                    <div
                      onClick={
                        articles.length > 3 && first > 0
                          ? this.moveLeft
                          : () => {}
                      }
                    >
                      <ChevronLeftIcon
                        classes={{
                          root: classNames(classes.carouselLeft, {
                            [classes.carouselDisabled]: !(
                              articles.length > 3 && first > 0
                            ),
                          }),
                        }}
                      />
                    </div>
                    <Grid item container spacing={3} xs={12}>
                      {articles.slice(first, last + 1).map(item => (
                        <NewsCard
                          key={generateUniqueString()}
                          item={item}
                          onClickMore={() => goToArticle(item)}
                        />
                      ))}
                    </Grid>
                    <div
                      onClick={
                        articles.length > 3 && last < articles.length - 1
                          ? this.moveRight
                          : () => {}
                      }
                    >
                      <ChevronRightIcon
                        classes={{
                          root: classNames(classes.carouselRight, {
                            [classes.carouselDisabled]: !(
                              articles.length > 3 && last < articles.length - 1
                            ),
                          }),
                        }}
                      />
                    </div>
                  </div>
                )}

                <Collapse in={opened}>
                  <Grid
                    item
                    container
                    spacing={3}
                    xs={12}
                    className={classes.expanded}
                  >
                    {articles.map(item => (
                      <NewsCard
                        key={generateUniqueString()}
                        item={item}
                        onClickMore={() => goToArticle(item)}
                      />
                    ))}
                  </Grid>
                </Collapse>
              </Fragment>
            )}
            {isArrayEmpty(articles) && <NoDataText text="No news available" />}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

CategoryNews.propTypes = {
  classes: PropTypes.object.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
  toCategoryPage: PropTypes.func.isRequired,
  goToArticle: PropTypes.func.isRequired,
};

export default withStyles(styles)(CategoryNews);
