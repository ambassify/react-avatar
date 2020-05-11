import React from 'react';
import PropTypes from 'prop-types';

import defaultCache from './cache';
import {defaultColors, defaultInitials} from './utils';

const defaults = {
    cache: defaultCache,
    colors: defaultColors,
    initials: defaultInitials,
    avatarRedirectUrl: null
};

const contextKeys = Object.keys(defaults);

/**
 * withConfig and ConfigProvider provide a compatibility layer for different
 * versions of React equiped with different versions of the Context API.
 *
 * If the new Context API is available it will be used, otherwise we will
 * fall back to the legacy context api.
 */

const ConfigContext = React.createContext && React.createContext();
const isLegacyContext = !ConfigContext;
const ConfigConsumer = isLegacyContext ? null : ConfigContext.Consumer;

/**
 * This was introduced in React 16.3.0 we need this to
 * prevent errors in newer versions. But we will just forward the
 * component for any version lower than 16.3.0
 *
 * https://github.com/Sitebase/react-avatar/issues/201
 * https://github.com/facebook/react/blob/master/CHANGELOG.md#1630-march-29-2018
 */
const forwardRef = React.forwardRef || (C => C);

export class ConfigProvider extends React.Component {

    static displayName = 'ConfigProvider';

    static propTypes = {
        cache: PropTypes.object,
        colors: PropTypes.arrayOf(PropTypes.string),
        initials: PropTypes.func,
        avatarRedirectUrl: PropTypes.string,

        children: PropTypes.node
    }

    _getContext() {
        const context = {};

        contextKeys.forEach(key => {
            if (typeof this.props[key] !== 'undefined')
                context[key] = this.props[key];
        });

        return context;
    }

    render() {
        const { children } = this.props;

        if (isLegacyContext)
            return React.Children.only(children);

        return (
            <ConfigContext.Provider value={this._getContext()}>
                {React.Children.only(children)}
            </ConfigContext.Provider>
        );
    }

}

export const withConfig = (Component) => {
    function withAvatarConfig(props, refOrContext) {

        // If legacy context is enabled, there is no support for forwardedRefs either
        if (isLegacyContext) {
            const ctx = refOrContext && refOrContext.reactAvatar;
            return ( <Component {...defaults} {...ctx} {...props} /> );
        }

        /* eslint-disable react/display-name */
        return (
            <ConfigConsumer>
                {config => (
                    <Component ref={refOrContext}
                        {...defaults}
                        {...config}
                        {...props} />
                )}
            </ConfigConsumer>
        );
        /* eslint-enable react/display-name */
    }

    // Legacy support, only set when legacy is detected
    withAvatarConfig.contextTypes = ConfigProvider.childContextTypes;

    return forwardRef(withAvatarConfig);
};

if (isLegacyContext) {
    ConfigProvider.childContextTypes = { reactAvatar: PropTypes.object };
    ConfigProvider.prototype.getChildContext = function() {
        return { reactAvatar: this._getContext() };
    };
}
