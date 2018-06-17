import React from 'react';
import PropTypes from 'prop-types';

import defaultCache from './cache';
import {defaultColors} from './utils';

const defaults = {
    cache: defaultCache,
    colors: defaultColors
};

/**
 * withConfig and ConfigProvider provide a compatibility layer for different
 * versions of React equiped with different versions of the Context API.
 *
 * If the new Context API is available it will be used, otherwise we will
 * fall back to the legacy context api.
 */


const ConfigContext = React.createContext && React.createContext();
const ConfigConsumer = ConfigContext ? ConfigContext.Consumer : null;

export const withConfig = (Component) => {
    function withAvatarConfig(props, context = {}) {
        const { reactAvatar } = context;

        if (!ConfigConsumer)
            return ( <Component {...defaults} {...reactAvatar} {...props} /> );

        return (
            <ConfigConsumer>
                {config => ( <Component {...defaults} {...config} {...props} /> )}
            </ConfigConsumer>
        );
    }

    withAvatarConfig.contextTypes = {
        reactAvatar: PropTypes.object
    };

    return withAvatarConfig;
};

export class ConfigProvider extends React.Component {

    static displayName = 'ConfigProvider';

    static propTypes = {
        cache: PropTypes.object,
        colors: PropTypes.arrayOf(PropTypes.string),

        children: PropTypes.node
    }

    static childContextTypes = {
        reactAvatar: PropTypes.object
    }

    getChildContext() {
        return {
            reactAvatar: this._getContext()
        };
    }

    _getContext() {
        const { cache, colors } = this.props;

        return { cache, colors };
    }

    render() {
        const { children } = this.props;

        if (!ConfigContext)
            return React.Children.only(children);

        return (
            <ConfigContext.Provider value={this._getContext()}>
                {React.Children.only(children)}
            </ConfigContext.Provider>
        );
    }

}
