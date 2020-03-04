'use strict';

import PropTypes from 'prop-types';
import md5 from 'md5';

import { getImageSize } from '../utils';


export default
class GravatarSource {

    static propTypes = {
        email: PropTypes.string,
        md5Email: PropTypes.string
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

        let url = `https://secure.gravatar.com/avatar/${email}?d=404`;

        if (size)
            url += `&s=${size}`;

        setState({
            sourceName: 'gravatar',
            src: url
        });
    }
}
