'use strict';

import {getRandomColor} from '../utils';

export default
class ValueSource {

    props = null

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => {
        return !!this.props.name || !!this.props.value;
    }

    getInitials()
    {
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

    getColor(value) {
        const {color, colors} = this.props;
        return color || getRandomColor(value, colors);
    }

    get = (setState) => {
        const value = this.getValue();
        const state = value ? {
            value: value,
            color: this.getColor(value)
        } : null;
        setState(state);
    }
}
