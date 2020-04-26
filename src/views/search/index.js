import React from 'react';
import { connect } from 'react-redux';

import SearchPage from '../../components/pages/searchPage';
import PageContainer from '../../components/shared/pageContainer';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const SearchPageView = props => {
  return (
    <PageContainer {...this.props}>
      <SearchPage {...this.props} />
    </PageContainer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPageView);
