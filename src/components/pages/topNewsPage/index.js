import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NoDataText from '../../shared/noDataText';
import CustomScrollBar from '../../shared/customScrollBar';
import NewsCard from '../../shared/newsCard';
import { countryNames } from '../../../constants/countries';

import { isArrayEmpty } from '../../../utility/helpers';

import { topNews } from '../../../constants/dummyNews';

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

class TopNewsPage extends PureComponent {
  state = {
    dataFetching: false,
    noResults: false,
  };

  componentDidMount() {
    // const { country, getTopNews } = this.props;
    // getTopNews(country).then(() => {
    //   this.setState({ dataFetching: false });
    //   this.handleNoResults();
    // });
  }

  componentDidUpdate(prevProps) {
    // const { country, getTopNews } = this.props;
    // if (prevProps.country !== country) {
    //   this.setState({ dataFetching: true });
    //   getTopNews(country).then(() => {
    //     this.setState({ dataFetching: false });
    //     this.handleNoResults();
    //   });
    // }
  }

  componentWillUnmount() {
    const { clearTopNews } = this.props;
    clearTopNews();
  }

  handleNoResults = () => {
    const { topNews } = this.props;
    this.setState({ noResults: isArrayEmpty(topNews) });
  };

  goToArticle = () => {};

  render() {
    // const { classes, topNews, country } = this.props;
    const { classes, country } = this.props;
    const { dataFetching, noResults } = this.state;

    return (
      <Fragment>
        <div className={classes.main}>
          <Grid container spacing={0}>
            <Grid item xs={12} className={classes.pageTitleContainer}>
              <div className={classes.title}>
                <div className={classes.titlePoint} />
                <Typography variant="h1" className={classes.textClassName}>
                  {`Top news from ${countryNames[country]}:`}
                </Typography>
              </div>
            </Grid>
            {!dataFetching && !isArrayEmpty(topNews) && (
              <CustomScrollBar
                verticalScroll
                removeScrollX
                scrollBarHeight={670}
              >
                <Grid item container spacing={3} xs={12}>
                  {topNews.map(item => (
                    <NewsCard
                      key={item.url}
                      item={item}
                      onClickMore={this.goToArticle}
                    />
                  ))}
                  {!dataFetching && noResults && isArrayEmpty(topNews) && (
                    <NoDataText text="No news available" />
                  )}
                </Grid>
              </CustomScrollBar>
            )}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

TopNewsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  topNews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(TopNewsPage);
