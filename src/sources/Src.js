'use strict';

export default
class SrcSource {

    props = null

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.src;

    get = (setState) => {
        setState({
            src: this.props.src
        });
    }
}
