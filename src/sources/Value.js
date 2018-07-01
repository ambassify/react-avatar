'use strict';

import PropTypes from 'prop-types';
import {getRandomColor} from '../utils';

export default
class ValueSource {

    static propTypes = {
        name: PropTypes.string,
        value: PropTypes.string,
        email: PropTypes.string,
        maxInitials: PropTypes.number
    }

    props = null

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => {
        return !!(this.props.name || this.props.value || this.props.email);
    }

    getInitials() {
        const name = this.props.name;
        const maxInitials = this.props.maxInitials;
        const parts = name.split(' ');
        let initials = '';
        for(let i = 0 ; i < parts.length ; i++)
        {
            initials += parts[i].substr(0, 1).toUpperCase();
        }
        return maxInitials ? initials.slice(0, maxInitials) : initials;
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
