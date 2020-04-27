import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CustomScrollBar from '../../shared/customScrollBar';
import CategoryNews from '../../shared/categoryNews';

import { countryNames } from '../../../constants/countries';

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
});

class CategoriesPage extends PureComponent {
  state = {
    dataFetching: true,
  };

  componentDidMount = () => {
    const { country, getCategoryNews } = this.props;
    Promise.all([
      getCategoryNews(country, 'business', 5),
      getCategoryNews(country, 'entertainment', 5),
      getCategoryNews(country, 'general', 5),
      getCategoryNews(country, 'health', 5),
      getCategoryNews(country, 'science', 5),
      getCategoryNews(country, 'sports', 5),
      getCategoryNews(country, 'technology', 5),
    ]).then(() => {
      this.setState({ dataFetching: false });
    });
  };

  componentDidUpdate(prevProps) {
    const { country, getCategoryNews } = this.props;
    if (prevProps.country !== country) {
      this.setState({ dataFetching: true });
      Promise.all([
        getCategoryNews(country, 'business', 5),
        getCategoryNews(country, 'entertainment', 5),
        getCategoryNews(country, 'general', 5),
        getCategoryNews(country, 'health', 5),
        getCategoryNews(country, 'science', 5),
        getCategoryNews(country, 'sports', 5),
        getCategoryNews(country, 'technology', 5),
      ]).then(() => {
        this.setState({ dataFetching: false });
      });
    }
  }

  componentWillUnmount() {
    this.props.clearAllCategories();
  }

  toCategoryPage = category => {
    const { history } = this.props;
    history.push(`/categories/${category}`);
  };

  goToArticle = item => {
    const { history } = this.props;
    const { title, urlToImage, content } = item;
    history.push('/categories/all/article', {
      article: {
        title,
        urlToImage,
        content,
      },
    });
  };

  render() {
    const { classes, country, categories } = this.props;
    const { dataFetching } = this.state;

    return (
      <Fragment>
        <div className={classes.main}>
          <Grid container item xs={12} spacing={0}>
            <Grid item xs={12} className={classes.pageTitleContainer}>
              <div className={classes.title}>
                <div className={classes.titlePoint} />
                <Typography variant="h2" className={classes.textClassName}>
                  {`Top 5 news by categories from ${countryNames[country]}:`}
                </Typography>
              </div>
            </Grid>
            {!dataFetching && (
              <CustomScrollBar
                verticalScroll
                removeScrollX
                scrollBarHeight={670}
              >
                <Grid item xs={12}>
                  {Object.keys(categories).map(item => (
                    <CategoryNews
                      key={item}
                      category={item}
                      articles={categories[item]}
                      toCategoryPage={() => this.toCategoryPage(item)}
                      goToArticle={this.goToArticle}
                    />
                  ))}
                </Grid>
              </CustomScrollBar>
            )}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

CategoriesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  getCategoryNews: PropTypes.func.isRequired,
  clearAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoriesPage);
