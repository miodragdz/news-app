import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NoDataText from '../../shared/noDataText';
import CustomScrollBar from '../../shared/customScrollBar';
import NewsCard from '../../shared/newsCard';
import { countryNames } from '../../../constants/countries';

import { isArrayEmpty, generateUniqueString } from '../../../utility/helpers';

const styles = () => ({
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pageTitleContainer: {
    paddingTop: '20px',
    marginBottom: '40px',
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
});

class CategoryPage extends PureComponent {
  state = {
    dataFetching: true,
    noResults: false,
    category: '',
  };

  componentDidMount() {
    const { country, getCategoryNews, match } = this.props;
    const { category } = match.params;
    getCategoryNews(country, category, 20).then(() => {
      this.setState({ dataFetching: false, category });
      this.handleNoResults();
    });
  }

  componentDidUpdate(prevProps) {
    const { country, getCategoryNews } = this.props;
    const { category } = this.state;
    if (prevProps.country !== country) {
      this.setState({ dataFetching: true });
      getCategoryNews(country, category, 20).then(() => {
        this.setState({ dataFetching: false });
        this.handleNoResults();
      });
    }
  }

  componentWillUnmount() {
    const { clearCategoryNews } = this.props;
    const { category } = this.state;
    clearCategoryNews(category);
  }

  handleNoResults = () => {
    const { categories } = this.props;
    const { category } = this.state;
    this.setState({ noResults: isArrayEmpty(categories[category]) });
  };

  goToArticle = item => {
    const { history } = this.props;
    const { category } = this.state;
    const { title, urlToImage, content } = item;
    history.push(`/categories/${category}/article`, {
      article: {
        title,
        urlToImage,
        content,
      },
    });
  };

  render() {
    const { classes, country, categories } = this.props;
    const { dataFetching, noResults, category } = this.state;

    return (
      <Fragment>
        <div className={classes.main}>
          <Grid container spacing={0}>
            <Grid item xs={12} className={classes.pageTitleContainer}>
              <div className={classes.title}>
                <div className={classes.titlePoint} />
                <Typography variant="h1" className={classes.textClassName}>
                  {`Top ${category} news from ${countryNames[country]}:`}
                </Typography>
              </div>
            </Grid>
            {!dataFetching && !isArrayEmpty(categories[category]) && (
              <CustomScrollBar
                verticalScroll
                removeScrollX
                scrollBarHeight={670}
              >
                <Grid item container spacing={3} xs={12}>
                  {categories[category].map(item => (
                    <NewsCard
                      key={generateUniqueString()}
                      item={item}
                      onClickMore={() => this.goToArticle(item)}
                    />
                  ))}
                </Grid>
              </CustomScrollBar>
            )}
            {!dataFetching &&
              noResults &&
              isArrayEmpty(categories[category]) && (
                <NoDataText text="No news available" />
              )}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
  getCategoryNews: PropTypes.func.isRequired,
  clearCategoryNews: PropTypes.func.isRequired,
};

export default withStyles(styles)(CategoryPage);
