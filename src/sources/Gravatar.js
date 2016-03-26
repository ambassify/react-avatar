'use strict';

import retina from 'is-retina';
import md5 from 'md5';

const IS_RETINA = retina();

export default
class GravatarSource {

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
        const size = IS_RETINA ? props.size * 2 : props.size;
        const url = `https://secure.gravatar.com/avatar/${email}?s=${size}&d=404`;

        setState({src: url});
    }
}
