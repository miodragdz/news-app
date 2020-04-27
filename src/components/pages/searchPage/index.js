import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Search from '../../shared/search';
import CustomScrollBar from '../../shared/customScrollBar';
import NewsCard from '../../shared/newsCard';
import NoDataText from '../../shared/noDataText';
import { countryNames } from '../../../constants/countries';

import {
  isArrayEmpty,
  debounce,
  generateUniqueString,
} from '../../../utility/helpers';

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
    marginBottom: '15px',
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
  search: {
    width: 411,
    marginRight: 9,
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '35px',
  },
});

class SearchPage extends PureComponent {
  state = {
    dataFetching: false,
    noResults: false,
    searchTerm: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { country, getFilteredNews } = this.props;
    const { searchTerm } = this.state;
    if (prevProps.country !== country && searchTerm !== '') {
      this.setState({ dataFetching: true });
      getFilteredNews(country, searchTerm).then(() => {
        this.setState({ dataFetching: false });
        this.handleNoResults();
      });
    }
  }

  onSearch = text => {
    console.log('SearchPage -> componentDidMount -> text', text);
    const { country, getFilteredNews } = this.props;
    this.setState({ dataFetching: true, searchTerm: text });
    getFilteredNews(country, text).then(() => {
      this.setState({ dataFetching: false });
      this.handleNoResults();
    });
  };

  handleNoResults = () => {
    const { filteredNews } = this.props;
    this.setState({ noResults: isArrayEmpty(filteredNews) });
  };

  goToArticle = item => {
    const { history } = this.props;
    const { title, urlToImage, content } = item;
    history.push('/search/article', {
      article: {
        title,
        urlToImage,
        content,
      },
    });
  };

  render() {
    const { classes, filteredNews, country } = this.props;
    const { dataFetching, noResults } = this.state;

    return (
      <Fragment>
        <div className={classes.main}>
          <Grid container spacing={0}>
            <Grid item xs={12} className={classes.pageTitleContainer}>
              <div className={classes.title}>
                <div className={classes.titlePoint} />
                <Typography variant="h1" className={classes.textClassName}>
                  {`Search top news from ${countryNames[country]} by term:`}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} className={classes.searchContainer}>
              <div className={classes.search}>
                <Search
                  className={classes.search}
                  onChange={debounce(this.onSearch, 300)}
                />
              </div>
            </Grid>
            {!dataFetching && !isArrayEmpty(filteredNews) && (
              <CustomScrollBar
                verticalScroll
                removeScrollX
                scrollBarHeight={670}
              >
                <Grid item container spacing={3} xs={12}>
                  {filteredNews.map(item => (
                    <NewsCard
                      key={generateUniqueString()}
                      item={item}
                      onClickMore={() => this.goToArticle(item)}
                    />
                  ))}
                </Grid>
              </CustomScrollBar>
            )}
            {!dataFetching && noResults && isArrayEmpty(filteredNews) && (
              <NoDataText text="No news available for that search" />
            )}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

SearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  getFilteredNews: PropTypes.func.isRequired,
  clearFilteredNews: PropTypes.func.isRequired,
  filteredNews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(SearchPage);
