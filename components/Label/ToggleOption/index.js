/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { injectIntl, intlShape } from 'react-intl';

const ToggleOption = ({ value }) => (
  <option value={value}>{value}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  // message: PropTypes.object,
  // intl: intlShape.isRequired,
};

export default ToggleOption;
