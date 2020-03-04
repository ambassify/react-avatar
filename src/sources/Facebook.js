'use strict';
import PropTypes from 'prop-types';
import { getImageSize } from '../utils';

export default
class FacebookSource {

    static propTypes = {
        facebookId: PropTypes.string
    }

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.facebookId

    get = (setState) => {
        const { facebookId } = this.props;
        const size = getImageSize(this.props.size);

        let url = `https://graph.facebook.com/${facebookId}/picture`;

        if (size)
            url += `?width=${size}&height=${size}`;

        setState({
            sourceName: 'facebook',
            src: url
        });
    }
}
