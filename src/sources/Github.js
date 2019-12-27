'use strict';
import PropTypes from 'prop-types';

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
        const { size, githubHandle } = this.props;
        const url = `https://avatars.githubusercontent.com/${githubHandle}?v=4&s=${size}`;

        setState({
            sourceName: 'github',
            src: url
        });
    }
}
