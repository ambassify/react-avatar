'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {withConfig, ConfigProvider} from './context';
import {getRandomColor, parseSize} from './utils';

import gravatarSource from './sources/Gravatar';
import facebookSource from './sources/Facebook';
import vkontakteSource from './sources/Vkontakte';
import twitterSource from './sources/Twitter';
import googleSource from './sources/Google';
import skypeSource from './sources/Skype';
import valueSource from './sources/Value';
import srcSource from './sources/Src';
import iconSource from './sources/Icon';

const SOURCES = [
    facebookSource,
    googleSource,
    twitterSource,
    vkontakteSource,
    skypeSource,
    gravatarSource,
    srcSource,
    valueSource,
    iconSource
];

// Collect propTypes for each individual source
const sourcePropTypes = SOURCES.reduce((r, s) => Object.assign(r, s.propTypes), {});

export {getRandomColor} from './utils';
export {ConfigProvider} from './context';

function matchSource(Source, props, cb) {
    const { cache } = props;
    const instance = new Source(props);

    if(!instance.isCompatible(props))
        return cb();

    instance.get((state) => {
        const failedBefore = state &&
            state.hasOwnProperty('src') &&
            cache.hasSourceFailedBefore(state.src);

        if(!failedBefore && state) {
            cb(state);
        } else {
            cb();
        }
    });
}

export
class Avatar extends PureComponent {

    static displayName = 'Avatar'

    static propTypes = {
        // PropTypes defined on sources
        ...sourcePropTypes,

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
        unstyled: false
    }

    constructor(props) {
        super(props);

        this.state = {
            internal: { sourcePointer: 0 },
            src: props.src,
            value: null,
            color: props.color
        };
    }

    componentWillMount() {
        this.fetch();
    }

    componentWillReceiveProps(newProps) {
        let needsUpdate = false;

        // This seems redundant
        //
        // Props that need to be in `state` are
        // `value`, `src` and `color`
        for (const prop in sourcePropTypes)
            needsUpdate = needsUpdate || (newProps[prop] !== this.props[prop]);

        if (needsUpdate)
            setTimeout(this.fetch, 0);
    }

    static getRandomColor = getRandomColor
    static ConfigProvider = ConfigProvider

    _createFetcher = (internal) => (errEvent) => {
        const { cache } = this.props;

        // Internal state has been reset => we received new props
        if (internal !== this.state.internal)
            return;

        // Mark img source as failed for future reference
        if( errEvent && errEvent.type === 'error' )
            cache.sourceFailed(errEvent.target.src);

        const pointer = internal.sourcePointer;
        if(SOURCES.length === pointer)
            return;

        const source = SOURCES[pointer];

        internal.sourcePointer++;

        matchSource(source, this.props, (nextState) => {
            if (!nextState)
                return setTimeout(internal.fetch, 0);

            // Reset other values to prevent them from sticking (#51)
            nextState = {
                src: null,
                value: null,
                color: null,

                ...nextState
            };

            this.setState(state => {
                // Internal state has been reset => we received new props
                return internal === state.internal ? nextState : {};
            });
        });
    }

    fetch = () => {
        const internal = { sourcePointer: 0 };
        internal.fetch = this._createFetcher(internal);

        this.setState({ internal }, internal.fetch);
    };

    _renderAsImage() {
        const { className, round, unstyled, name, value } = this.props;
        const { internal } = this.state;
        const size = parseSize(this.props.size);
        const alt = name || value;

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
                alt={alt}
                onError={internal.fetch} />
        );
    }

    _renderAsText() {
        const { className, textSizeRatio, round, unstyled } = this.props;
        const size = parseSize(this.props.size);

        const initialsStyle = unstyled ? null : {
            width: size.str,
            height: size.str,
            fontSize: (size.value / textSizeRatio).toFixed(4) + size.unit,
            lineHeight: size.str,
            textAlign: 'center',
            textTransform: 'uppercase',
            color: this.props.fgColor,
            background: this.state.color,
            borderRadius: (round === true ? '100%' : round)
        };

        return (
            <div className={className + ' sb-avatar__text'}
                style={initialsStyle}>
                {this.state.value}
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

export default Object.assign(withConfig(Avatar), {
    getRandomColor,
    ConfigProvider
});
