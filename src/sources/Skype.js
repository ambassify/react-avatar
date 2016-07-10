'use strict';

export default
class SkypeSource {

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.skypeId

    get = (setState) => {
        const { skypeId } = this.props;
        const url = `https://api.skype.com/users/${skypeId}/profile/avatar`;

        setState({src: url});
    }
}
