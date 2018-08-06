import React from 'react';
import PropTypes from 'prop-types';

const ErrorComp = ({ error }) => (
  <h1>
    {error.code}
    {error.message}
  </h1>
);

ErrorComp.propTypes = {
  error: PropTypes.instanceOf(Object),
};

export default ErrorComp;
