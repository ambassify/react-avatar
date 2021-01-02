'use strict';

import React from 'react';

import { Cache } from './cache';
import {withConfig, ConfigProvider} from './context';
import createAvatarDataProvider from './data-provider';
import {getRandomColor} from './utils';

import Image from './components/image';
import Text from './components/text';

export {getRandomColor} from './utils';
export {ConfigProvider} from './context';
export {Cache} from './cache';

export default
function createAvatarComponent(options) {

    const DataProvider = createAvatarDataProvider(options);

    const Component = withConfig(
        // eslint-disable-next-line react/display-name
        React.forwardRef((props, ref) => (
            <DataProvider {...props} propertyName="avatar">
                {avatar => {
                    const Avatar = avatar.src ? Image : Text;

                    return (
                        <Avatar {...props}
                            avatar={avatar}
                            ref={ref} />
                    );
                }}
            </DataProvider>
        ))
    );

    return Object.assign(Component, {
        getRandomColor,
        ConfigProvider,
        Cache
    });
}
