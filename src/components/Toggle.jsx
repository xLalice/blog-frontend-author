// src/components/ui/toggle.jsx

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Toggle = ({ size, pressed, onPressedChange, children }) => {
    const baseClasses = 'flex items-center justify-center border border-black rounded cursor-pointer transition';
    const sizeClasses = size === 'sm' ? 'w-8 h-8 p-1' : 'w-10 h-10 p-2';
    const pressedClasses = pressed ? 'bg-blue-500 text-white' : 'bg-white text-black';

    return (
        <button
            className={classNames(baseClasses, sizeClasses, pressedClasses, 'hover:bg-blue-100')}
            onClick={onPressedChange}
        >
            {children}
        </button>
    );
};

Toggle.propTypes = {
    size: PropTypes.string,
    pressed: PropTypes.bool,
    onPressedChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

Toggle.defaultProps = {
    size: 'sm',
    pressed: false,
};

export default Toggle;
