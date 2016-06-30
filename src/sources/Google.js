'use strict';

import {fetch,cacheFailingSource,hasSourceFailedBefore} from '../utils';

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

        if(hasSourceFailedBefore(url)) {
            setState(null);
            return;
        }

        fetch(url, (data) => {
            const src = data.entry.gphoto$thumbnail.$t;
            const srcWithCorrectSize = src.replace('s64', 's' + size);
            setState({
                src: srcWithCorrectSize
            });
        }, () => {
            // on error
            cacheFailingSource(url);
            setState(null);
        });
    }
}
