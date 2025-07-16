'use strict';

import PropTypes from 'prop-types';
import md5 from 'md5';

import { getImageSize } from '../utils';

// Define valid Gravatar fallback options
const validGravatarFallbacks = [
    '404',        // Do not load any image, return a 404
    'mp',         // Mystery Person
    'identicon',  // Geometric pattern based on email hash
    'monsterid',  // A generated monster image
    'wavatar',    // A generated face
    'retro',      // 8-bit retro avatar
    'robohash',   // Robot based on hash
    'blank'       // Transparent, blank image
];

export default
class GravatarSource {

    static propTypes = {
        email: PropTypes.string,
        md5Email: PropTypes.string,
        fallback: PropTypes.string
    }

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => {
        return !!this.props.email || !!this.props.md5Email;
    }

    get = (setState) => {
        const { props } = this;
        const email = props.md5Email || md5(props.email);
        const size = getImageSize(props.size);

        // Check if the provided fallback is a valid Gravatar option or a URL
        let fallback = validGravatarFallbacks.includes(props.fallback)
            ? props.fallback
            : encodeURIComponent(props.fallback || 'blank'); // Use fallback, or default to 'blank'

        // Construct the Gravatar URL with the valid fallback
        let url = `https://secure.gravatar.com/avatar/${email}?d=${fallback}`;

        if (size)
            url += `&s=${size}`;

        setState({
            sourceName: 'gravatar',
            src: url
        });
    }
}
