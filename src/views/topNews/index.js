import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageContainer from '../../components/shared/pageContainer';
import TopNewsPage from '../../components/pages/topNewsPage';

import { setCountry } from '../../store/modules/country';
import { getTopNews, clearTopNews } from '../../store/modules/topNews';

import { countrySelector } from '../../store/selectors/countrySelector';
import { topNewsSelector } from '../../store/selectors/topNewsSelector';

const mapStateToProps = state => ({
  country: countrySelector(state),
  topNews: topNewsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setCountry: data => dispatch(setCountry(data)),
  getTopNews: country => getTopNews(dispatch, country),
  clearTopNews: () => dispatch(clearTopNews()),
});

class TopNewsPageView extends PureComponent {
  render() {
    return (
      <PageContainer {...this.props}>
        <TopNewsPage {...this.props} />
      </PageContainer>
    );
  }
}

TopNewsPageView.propTypes = {
  setCountry: PropTypes.func.isRequired,
  getTopNews: PropTypes.func.isRequired,
  clearTopNews: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNewsPageView);
