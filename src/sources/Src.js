'use strict';

import PropTypes from 'prop-types';

export default
class SrcSource {

    static propTypes = {
        src: PropTypes.string
    }

    props = null

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.src;

    get = (setState) => {
        setState({
            sourceName: 'src',
            src: this.props.src
        });
    }
}
