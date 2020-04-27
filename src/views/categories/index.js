import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoriesPage from '../../components/pages/categoriesPage';
import PageContainer from '../../components/shared/pageContainer';

import { setCountry } from '../../store/modules/country';
import {
  getCategoryNews,
  clearCategoryNews,
  clearAllCategories,
} from '../../store/modules/categories';

import { countrySelector } from '../../store/selectors/countrySelector';
import { categoriesSelector } from '../../store/selectors/categoriesSelector';

const mapStateToProps = state => ({
  country: countrySelector(state),
  categories: categoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setCountry: data => dispatch(setCountry(data)),
  getCategoryNews: (country, category, pageSize) =>
    getCategoryNews(dispatch, country, category, pageSize),
  clearCategoryNews: category => clearCategoryNews(dispatch, category),
  clearAllCategories: () => dispatch(clearAllCategories()),
});

class CategoriesPageView extends PureComponent {
  render() {
    return (
      <PageContainer {...this.props}>
        <CategoriesPage {...this.props} />
      </PageContainer>
    );
  }
}

CategoriesPageView.propTypes = {
  setCountry: PropTypes.func.isRequired,
  getCategoryNews: PropTypes.func.isRequired,
  clearCategoryNews: PropTypes.func.isRequired,
  clearAllCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPageView);
