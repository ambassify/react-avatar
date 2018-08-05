'use strict';
import PropTypes from 'prop-types';

export default
function createRedirectSource(network, property) {
    return class AvatarRedirectSource {

        static propTypes = {
            [property]: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        }

        props = null;

        constructor(props) {
            this.props = props;
        }

        isCompatible = () => {
            return !!this.props.avatarRedirectUrl && !!this.props[property];
        }

        get = (setState) => {
            const { size, avatarRedirectUrl } = this.props;

            const baseUrl = avatarRedirectUrl.replace(/\/*$/, '/');
            const id = this.props[property];

            const query = size ? '' : `size=${size}`;
            const src = `${baseUrl}${network}/${id}?${query}`;

            setState({ source: 'network', src });
        }
    };
}
