import React from 'react';
import PropTypes from 'prop-types';

const Test = ({ query }) => (
  <h1>
This is a tess:
    {JSON.stringify(query)}
  </h1>
);

Test.propTypes = {
  query: PropTypes.instanceOf(Object),
};

export default Test;
