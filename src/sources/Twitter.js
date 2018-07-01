'use strict';

import PropTypes from 'prop-types';

export default
class TwitterSource {

    static propTypes = {
        twitterHandle: PropTypes.string
    }

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.twitterHandle

    getImageSize() {
        const { size } = this.props;

        if (size <= 24)
            return 'mini';

        if (size <= 48)
            return 'normal';

        if (size <= 73)
            return 'bigger';

        return 'original';
    }

    get = (setState) => {
        const { twitterHandle } = this.props;
        const size = this.getImageSize();

        const url = `https://twitter.com/${twitterHandle}/profile_image?size=${size}`;

        setState({
            sourceName: 'twitter',
            src: url
        });
    }
}
