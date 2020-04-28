import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchPage from '../../components/pages/searchPage';
import PageContainer from '../../components/shared/pageContainer';

import { countrySelector } from '../../store/selectors/countrySelector';
import { searchSelector } from '../../store/selectors/searchSelector';

import { setCountry } from '../../store/modules/country';
import { getFilteredNews, clearFilteredNews } from '../../store/modules/search';

const mapStateToProps = state => ({
  country: countrySelector(state),
  filteredNews: searchSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setCountry: data => dispatch(setCountry(data)),
  getFilteredNews: (country, searchTerm) =>
    getFilteredNews(dispatch, country, searchTerm),
  clearFilteredNews: () => dispatch(clearFilteredNews()),
});

class SearchPageView extends PureComponent {
  render() {
    return (
      <PageContainer {...this.props}>
        <SearchPage {...this.props} />
      </PageContainer>
    );
  }
}

SearchPageView.propTypes = {
  country: PropTypes.string.isRequired,
  filteredNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCountry: PropTypes.func.isRequired,
  getFilteredNews: PropTypes.func.isRequired,
  clearFilteredNews: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageView);
