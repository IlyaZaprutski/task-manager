import { memo } from 'react';
import PropTypes from 'prop-types';

import { PageTitle, PageWrapper } from './pageLayoutStyle';

export const PageLayout = memo(({ name, children }) => {
  return (
    <PageWrapper>
      <PageTitle>{name}</PageTitle>
      {children}
    </PageWrapper>
  );
});

PageLayout.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
