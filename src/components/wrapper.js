import React from 'react';
import PropTypes from 'prop-types';

import { parseSize } from '../utils';

export default
class AvatarWrapper extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        round: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        style: PropTypes.object,
        size: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        unstyled: PropTypes.bool,
        avatar: PropTypes.object,

        onClick: PropTypes.func,
        children: PropTypes.node,
    }

    render() {
        const {
            className,
            unstyled,
            round,
            style,
            avatar,
            onClick,
            children,

        } = this.props;
        const { sourceName } = avatar;
        const size = parseSize(this.props.size);

        const hostStyle = unstyled ? null : {
            display: 'inline-block',
            verticalAlign: 'middle',
            width: size.str,
            height: size.str,
            borderRadius: (round === true ? '100%' : round),
            fontFamily: 'Helvetica, Arial, sans-serif',
            ...style
        };

        const classNames = [ className, 'sb-avatar' ];

        if (sourceName) {
            const source = sourceName.toLowerCase()
                .replace(/[^a-z0-9-]+/g, '-') // only allow alphanumeric
                .replace(/^-+|-+$/g, ''); // trim `-`
            classNames.push('sb-avatar--' + source);
        }

        return (
            <div className={classNames.join(' ')}
                onClick={onClick}
                style={hostStyle}>
                {children}
            </div>
        );
    }

}
