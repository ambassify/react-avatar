'use strict';

import {fetch} from '../utils';

export default
class GoogleSource {

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.googleId

    get = (setState) => {
        const { size, googleId } = this.props;
        const url = `https://picasaweb.google.com/data/entry/api/user/${googleId}?alt=json`;

        fetch(url, (data) => {
            const src = data.entry.gphoto$thumbnail.$t;
            const srcWithCorrectSize = src.replace('s64', 's' + size);
            setState({
                src: srcWithCorrectSize
            });
        }, () => {
            // error
            console.log('error');
            setState(null);
        });
    }
}
