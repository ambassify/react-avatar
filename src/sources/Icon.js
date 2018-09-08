'use strict';

import PropTypes from 'prop-types';
import {getRandomColor} from '../utils';

export default
class IconSource {

    props = null
    icon = '✷'

    static propTypes = {
        color: PropTypes.string
    }

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => true

    get = (setState) => {
        const { color, colors } = this.props;
        setState({
            sourceName: 'icon',
            value: this.icon,
            color: color || getRandomColor(this.icon, colors)
        });
    }
}
