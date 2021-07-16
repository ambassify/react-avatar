'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Cache } from './cache';
import {withConfig, ConfigProvider} from './context';
import {getRandomColor, parseSize, setGroupedTimeout} from './utils';
import InternalState from './internal-state';

export {getRandomColor} from './utils';
export {ConfigProvider} from './context';
export {Cache} from './cache';

function matchSource(Source, props, cb) {
    const { cache } = props;
    const instance = new Source(props);

    if(!instance.isCompatible(props))
        return cb();

    instance.get((state) => {
        const failedBefore = state && state.src &&
            cache.hasSourceFailedBefore(state.src);

        if(!failedBefore && state) {
            cb(state);
        } else {
            cb();
        }
    });
}

export default
function createAvatarComponent({ sources = [] }) {

    // Collect propTypes for each individual source
    const sourcePropTypes = sources.reduce((r, s) => Object.assign(r, s.propTypes), {});

    class Avatar extends PureComponent {

        static displayName = 'Avatar'

        static propTypes = {
            // PropTypes defined on sources
            ...sourcePropTypes,

            alt: PropTypes.string,
            title: PropTypes.string,
            className: PropTypes.string,
            fgColor: PropTypes.string,
            color: PropTypes.string,
            colors: PropTypes.arrayOf(PropTypes.string),
            round: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.string
            ]),
            style: PropTypes.object,
            size: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            textSizeRatio: PropTypes.number,
            textMarginRatio: PropTypes.number,
            unstyled: PropTypes.bool,
            cache: PropTypes.object,
            onClick: PropTypes.func

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

        constructor(props) {
            super(props);

            this.state = {
                internal: null,
                src: null,
                value: null,
                color: props.color
            };
        }

        componentDidMount() {
            this.mounted = true;
            this.fetch();
        }

        componentDidUpdate(prevProps) {
            let needsUpdate = false;

            // This seems redundant
            //
            // Props that need to be in `state` are
            // `value`, `src` and `color`
            for (const prop in sourcePropTypes)
                needsUpdate = needsUpdate || (prevProps[prop] !== this.props[prop]);

            if (needsUpdate)
                setTimeout(this.fetch, 0);
        }

        componentWillUnmount() {
            this.mounted = false;
            if (this.state.internal) {
                this.state.internal.active = false;
            }
        }

        static getRandomColor = getRandomColor

        static Cache = Cache;
        static ConfigProvider = ConfigProvider

        _createFetcher = (internal) => (errEvent) => {
            const { cache } = this.props;

            if (!internal.isActive(this.state))
                return;

            // Mark img source as failed for future reference
            if( errEvent && errEvent.type === 'error' )
                cache.sourceFailed(errEvent.target.src);

            const pointer = internal.sourcePointer;
            if(sources.length === pointer)
                return;

            const source = sources[pointer];

            internal.sourcePointer++;

            matchSource(source, this.props, (nextState) => {
                if (!nextState)
                    return setTimeout(internal.fetch, 0);

                if (!internal.isActive(this.state))
                    return;

                // Reset other values to prevent them from sticking (#51)
                nextState = {
                    src: null,
                    value: null,
                    color: null,

                    ...nextState
                };

                this.setState(state => {
                    // Internal state has been reset => we received new props
                    return internal.isActive(state) ? nextState : {};
                });
            });
        }

        fetch = () => {
            const internal = new InternalState();
            internal.fetch = this._createFetcher(internal);

            this.setState({ internal }, internal.fetch);
        };

        _scaleTextNode = (node, retryTTL = 16) => {
            const { unstyled, textSizeRatio, textMarginRatio } = this.props;

            if (!node || unstyled || this.state.src || !this.mounted)
                return;

            const spanNode = node.parentNode;
            if (!spanNode)
                return;

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

        _renderAsImage() {
            const { className, round, unstyled, alt, title, name, value } = this.props;
            const { internal } = this.state;
            const size = parseSize(this.props.size);

            const imageStyle = unstyled ? null : {
                maxWidth: '100%',
                width: size.str,
                height: size.str,
                borderRadius: (round === true ? '100%' : round)
            };

            return (
                <img className={className + ' sb-avatar__image'}
                    width={size.str}
                    height={size.str}
                    style={imageStyle}
                    src={this.state.src}
                    alt={alt || name || value}
                    title={title || name || value}
                    onError={internal && internal.fetch} />
            );
        }

        _renderAsText() {
            const { className, round, unstyled, title, name, value } = this.props;
            const size = parseSize(this.props.size);

            const initialsStyle = unstyled ? null : {
                width: size.str,
                height: size.str,
                lineHeight: 'initial',
                textAlign: 'center',
                color: this.props.fgColor,
                background: this.state.color,
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
                this.state.value,
                this.props.size
            ].join('');

            return (
                <div className={className + ' sb-avatar__text'}
                    style={initialsStyle}
                    title={title || name || value}>
                    <div style={tableStyle}>
                        <span style={spanStyle}>
                            <span ref={this._scaleTextNode} key={key}>
                                {this.state.value}
                            </span>
                        </span>
                    </div>
                </div>
            );
        }

        render() {
            const { className, unstyled, round, style, onClick } = this.props;
            const { src, sourceName } = this.state;
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
                    {src ? this._renderAsImage() : this._renderAsText()}
                </div>
            );
        }
    }

    return Object.assign(withConfig(Avatar), {
        getRandomColor,
        ConfigProvider,
        Cache
    });
}
