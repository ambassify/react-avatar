'use strict';

import {fetchJSONP} from '../utils';

export default
class GoogleSource {

    props = null;

    constructor(props) {
        this.props = props;
    }

    isCompatible = () => !!this.props.vkontakteId

    getImageSize() {
        const { size } = this.props;

        if (size <= 50)
            return 'photo_50';

        if (size <= 100)
            return 'photo_100';

        if (size <= 200)
            return 'photo_200';

        return 'photo_max';
    }

    get = (setState) => {
        const { vkontakteId } = this.props;
        const size = this.getImageSize();
        const url = `https://api.vk.com/method/users.get?user_id=${vkontakteId}&v=5.8&fields=${size}`;

        fetchJSONP(url, (data) => {
            const src = data.response[0][size];
            setState({
                src: src
            });
        }, () => {
            // on error
            setState(null);
        });
    }
}
