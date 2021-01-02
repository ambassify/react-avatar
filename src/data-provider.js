'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Cache } from './cache';
import {withConfig, ConfigProvider} from './context';
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
function createAvatarDataProvider({ sources = [] }) {

    // Collect propTypes for each individual source
    const sourcePropTypes = sources.reduce((r, s) => Object.assign(r, s.propTypes), {});

    class AvatarDataProvider extends PureComponent {

        static displayName = 'AvatarDataProvider'

        static propTypes = {
            // PropTypes defined on sources
            ...sourcePropTypes,

            cache: PropTypes.object,
            propertyName: PropTypes.string,
        }

        static defaultProps = {
            propertyName: 'avatar',
        }

        constructor(props) {
            super(props);

            this.state = {
                internal: null,
                src: null,
                value: null,
                color: props.color,
            };
        }

        componentDidMount() {
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
            if (this.state.internal) {
                this.state.internal.active = false;
            }
        }

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

        render() {
            const { children, propertyName } = this.props;
            const { src, value, color, sourceName, internal } = this.state;

            const avatarData = {
                src,
                value,
                color,
                sourceName,
                onRenderFailed: () => internal && internal.fetch() // eslint-disable-line
            };

            if (typeof children === 'function')
                return children(avatarData);

            const child = React.Children.only(children);
            return React.cloneElement(child, {
                [propertyName]: avatarData,
            });
        }
    }

    return Object.assign(withConfig(AvatarDataProvider), {
        ConfigProvider,
        Cache
    });
}
