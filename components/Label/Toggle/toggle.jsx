/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import ToggleOption from '../ToggleOption';

function Toggle(props) {
let content = <option>--</option>;

// If we have items, render them
if (props.values) {
    content = props.values.map(value => (
    <ToggleOption key={value} value={value}/>
    ));
}

return (
    <Select
    value={props.value}
    name={props.name}
    onChange={props.onToggle}>
    <option>Please choose</option>
    {content}
    </Select>
);
}

Toggle.propTypes = {
onToggle: PropTypes.func,
values: PropTypes.array,
value: PropTypes.string,
messages: PropTypes.object,
};

export default Toggle; 