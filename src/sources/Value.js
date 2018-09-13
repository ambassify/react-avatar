'use strict';

import PropTypes from 'prop-types';
import {getRandomColor, defaultInitials} from '../utils';

export default
class ValueSource {

    static propTypes = {
        color: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        email: PropTypes.string,
        maxInitials: PropTypes.number,
        initials: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ])
    }

    props = null

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => {
        return !!(this.props.name || this.props.value || this.props.email);
    }

    getInitials() {
        const { name, initials } = this.props;

        if (typeof initials === 'string')
            return initials;

        if (typeof initials === 'function')
            return initials(name, this.props);

        return defaultInitials(name, this.props);
    }

    getValue() {
        if(this.props.name)
            return this.getInitials();

        if(this.props.value)
            return this.props.value;

        return null;
    }

    getColor() {
        const {color, colors, name, email, value} = this.props;
        const colorValue = name || email || value;
        return color || getRandomColor(colorValue, colors);
    }

    get = (setState) => {
        const value = this.getValue();

        if (!value)
            return setState(null);

        setState({
            sourceName: 'text',
            value: value,
            color: this.getColor()
        });
    }
}
