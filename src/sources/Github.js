'use strict';
import PropTypes from 'prop-types';
import { getImageSize } from '../utils';

export default
class GithubSource {

    static propTypes = {
        githubHandle: PropTypes.string
    }

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.githubHandle

    get = (setState) => {
        const { githubHandle } = this.props;
        const size = getImageSize(this.props.size);

        let url = `https://avatars.githubusercontent.com/${githubHandle}?v=4`;

        if (size)
            url += `&s=${size}`;

        setState({
            sourceName: 'github',
            src: url
        });
    }
}
