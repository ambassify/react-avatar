'use strict';

import {getRandomColor} from '../utils';

export default
class IconSource {

    props = null
    icon = '✷'

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => true

    get = (setState) => {
        setState({
            value: this.icon,
            color: getRandomColor(this.icon, this.props.colors)
        });
    }
}
