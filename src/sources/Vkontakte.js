'use strict';

import {fetchJSONP} from '../utils';

export default
class VkontakteSource {

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
            const img = data && data.response && data.response[0];

            setState({
                src: img ? img[size] : null
            });
        }, () => {
            // on error
            setState(null);
        });
    }
}
