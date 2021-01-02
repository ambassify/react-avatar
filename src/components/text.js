import React from 'react';
import PropTypes from 'prop-types';

import { parseSize, setGroupedTimeout } from '../utils';
import Wrapper from './wrapper';

export default
class AvatarText extends React.PureComponent {

    static propTypes = {
        title: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        avatar: PropTypes.object,

        className: PropTypes.string,
        unstyled: PropTypes.bool,
        fgColor: PropTypes.string,
        textSizeRatio: PropTypes.number,
        textMarginRatio: PropTypes.number,
        round: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        size: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
    }

    static defaultProps = {
        className: '',
        fgColor: '#FFF',
        round: false,
        size: 100,
        textSizeRatio: 3,
        textMarginRatio: .15,
        unstyled: false
    }

    componentDidMount() {
        this._mounted = true;
        this._scaleTextNode(this._node);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    _scaleTextNode = (node, retryTTL = 16) => {
        const {
            unstyled,
            textSizeRatio,
            textMarginRatio,
            avatar
        } = this.props;

        this._node = node;

        if (!node || unstyled || avatar.src || !this._mounted)
            return;

        const spanNode = node.parentNode;
        const tableNode = spanNode.parentNode;

        const {
            width: containerWidth,
            height: containerHeight
        } = spanNode.getBoundingClientRect();

        // Whenever the avatar element is not visible due to some CSS
        // (such as display: none) on any parent component we will check
        // whether the component has become visible.
        //
        // The time between checks grows up to half a second in an attempt
        // to reduce flicker / performance issues.
        if (containerWidth == 0 && containerHeight == 0) {
            const ttl = Math.min(retryTTL * 1.5, 500);
            setGroupedTimeout(() => this._scaleTextNode(node, ttl), ttl);
            return;
        }

        // If the tableNode (outer-container) does not have its fontSize set yet,
        // we'll set it according to "textSizeRatio"
        if (!tableNode.style.fontSize) {
            const baseFontSize = containerHeight / textSizeRatio;
            tableNode.style.fontSize = `${baseFontSize}px`;
        }

        // Reset font-size such that scaling works correctly (#133)
        spanNode.style.fontSize = null;

        // Measure the actual width of the text after setting the container size
        const { width: textWidth } = node.getBoundingClientRect();

        if (textWidth < 0)
            return;

        // Calculate the maximum width for the text based on "textMarginRatio"
        const maxTextWidth = containerWidth * (1 - (2 * textMarginRatio));

        // If the text is too wide, scale it down by (maxWidth / actualWidth)
        if (textWidth > maxTextWidth)
            spanNode.style.fontSize = `calc(1em * ${maxTextWidth / textWidth})`;
    }

    render() {
        const {
            className,
            round,
            unstyled,
            title,
            name,
            value,
            avatar
        } = this.props;

        const size = parseSize(this.props.size);

        const initialsStyle = unstyled ? null : {
            width: size.str,
            height: size.str,
            lineHeight: 'initial',
            textAlign: 'center',
            color: this.props.fgColor,
            background: avatar.color,
            borderRadius: (round === true ? '100%' : round)
        };

        const tableStyle = unstyled ? null : {
            display: 'table',
            tableLayout: 'fixed',
            width: '100%',
            height: '100%'
        };

        const spanStyle = unstyled ? null : {
            display: 'table-cell',
            verticalAlign: 'middle',
            fontSize: '100%',
            whiteSpace: 'nowrap'
        };

        // Ensure the text node is updated and scaled when any of these
        // values changed by calling the `_scaleTextNode` method using
        // the correct `ref`.
        const key = [
            avatar.value,
            this.props.size
        ].join('');

        return (
            <Wrapper {...this.props}>
                <div className={className + ' sb-avatar__text'}
                    style={initialsStyle}
                    title={title || name || value}>
                    <div style={tableStyle}>
                        <span style={spanStyle}>
                            <span ref={this._scaleTextNode} key={key}>
                                {avatar.value}
                            </span>
                        </span>
                    </div>
                </div>
            </Wrapper>
        );
    }

}
