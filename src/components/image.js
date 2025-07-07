import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';

import { parseSize, calculateBorderRadius, getNullableText } from '../utils';
import Wrapper from './wrapper';

export default class AvatarImage extends React.PureComponent {
    static propTypes = {
        alt: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        name: PropTypes.string,
        value: PropTypes.string,
        avatar: PropTypes.object,
        email: PropTypes.string,  // Add email prop for Gravatar
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
        fallback: PropTypes.string, // Optional fallback prop for Gravatar fallback
        onError: PropTypes.func // Allow passing an external onError prop
    };

    static defaultProps = {
        className: '',
        round: false,
        size: 100,
        unstyled: false,
        fallback: 'blank', // Default to 'blank' if no fallback is provided
        onError: null // No default external onError
    };

    handleImageError = (e) => {
        const { email, fallback, onError } = this.props;

        // Only run fallback logic if fallback is explicitly provided
        if (fallback) {
            const emailHash = email ? md5(email.trim().toLowerCase()) : ''; // Hash the email for Gravatar

            // Set the fallback URL with the hashed email and fallback option
            e.target.src = `https://www.gravatar.com/avatar/${emailHash}?d=${encodeURIComponent(fallback)}`;
        }

        // If there's an external onError handler, call it as well
        if (onError) {
            onError(e);
        }
    };

    render() {
        const {
            className,
            round,
            unstyled,
            alt,
            title,
            name,
            value,
            avatar,
            email, // Email used for Gravatar hash
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
                    onError={this.handleImageError} // Call the error handler to use fallback and external onError
                />
            </Wrapper>
        );
    }
}
