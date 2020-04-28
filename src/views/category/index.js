import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCountry } from '../../store/modules/country';
import {
  getCategoryNews,
  clearCategoryNews,
  clearAllCategories,
} from '../../store/modules/categories';

import { countrySelector } from '../../store/selectors/countrySelector';
import { categoriesSelector } from '../../store/selectors/categoriesSelector';

import CategoryPage from '../../components/pages/categoryPage';
import PageContainer from '../../components/shared/pageContainer';

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

class CategoryPageView extends PureComponent {
  render() {
    return (
      <PageContainer {...this.props}>
        <CategoryPage {...this.props} />
      </PageContainer>
    );
  }
}

CategoryPageView.propTypes = {
  country: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
  getCategoryNews: PropTypes.func.isRequired,
  clearCategoryNews: PropTypes.func.isRequired,
  clearAllCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPageView);
