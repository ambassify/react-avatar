import React from 'react';
import PropTypes from 'prop-types';

import { parseSize, calculateBorderRadius, getNullableText } from '../utils';
import Wrapper from './wrapper';

export default
class AvatarImage extends React.PureComponent {

    static propTypes = {
        alt: PropTypes.string,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        name: PropTypes.string,
        value: PropTypes.string,
        avatar: PropTypes.object,

        className: PropTypes.string,
        unstyled: PropTypes.bool,
        round: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number,
        ]),
        size: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
    }

    static defaultProps = {
        className: '',
        round: false,
        size: 100,
        unstyled: false
    }

    render() {
        const {
            className,
            round,
            unstyled,
            alt,
            title,
            name,
            value,
            avatar
        } = this.props;

        const size = parseSize(this.props.size);

        const imageStyle = unstyled ? null : {
            maxWidth: '100%',
            width: size.str,
            height: size.str,
            borderRadius: calculateBorderRadius(round),
        };

        return (
            <Wrapper {...this.props}>
                <img className={className + ' sb-avatar__image'}
                    width={size.str}
                    height={size.str}
                    style={imageStyle}
                    src={avatar.src}
                    alt={getNullableText(alt, name || value)}
                    title={getNullableText(title, name || value)}
                    onError={avatar.onRenderFailed} />
            </Wrapper>
        );
    }
}
