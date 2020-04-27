import React from 'react';
import { connect } from 'react-redux';
import ArticlePage from '../../components/pages/articlePage';
import PageContainer from '../../components/shared/pageContainer';

import { countrySelector } from '../../store/selectors/countrySelector';

const mapStateToProps = state => ({
  country: countrySelector(state),
});

const mapDispatchToProps = dispatch => ({});

const ArticlePageView = props => {
  return (
    <PageContainer {...props} disabledButtons>
      <ArticlePage {...props} />
    </PageContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePageView);
