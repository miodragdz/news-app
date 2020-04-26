import React from 'react';
import { connect } from 'react-redux';
import PageNotFound from '../../components/shared/pageNotFound';
import PageContainer from '../../components/shared/pageContainer';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});

const PageNotFoundView = props => {
  return (
    <PageContainer {...props}>
      <PageNotFound />
    </PageContainer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNotFoundView);
