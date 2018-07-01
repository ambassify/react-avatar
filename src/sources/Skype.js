'use strict';

import PropTypes from 'prop-types';

export default
class SkypeSource {

    static propTypes = {
        skypeId: PropTypes.string
    }

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.skypeId

    get = (setState) => {
        const { skypeId } = this.props;
        const url = `https://api.skype.com/users/${skypeId}/profile/avatar`;

        setState({
            sourceName: 'skype',
            src: url
        });
    }
}
