/**
 * This file contains a very small demo project
 * that is tested for type correctness in the
 * `npm run test:type-check` check.
 *
 * This file is intended to include any API interface
 * to ensure that our type definitions are correct.
 */

import React, { Component } from 'react';
import Avatar, {
    createAvatarComponent,
    ConfigProvider,
    Cache,

    GravatarSource,
    FacebookSource,
    GithubSource,
    SkypeSource,
    ValueSource,
    SrcSource,
    IconSource,

    VKontakteSource,
    InstagramSource,
    TwitterSource,
    GoogleSource,
} from '..';

const CustomAvatar = createAvatarComponent({
    sources: [
        GravatarSource,
        FacebookSource,
        GithubSource,
        SkypeSource,
        ValueSource,
        SrcSource,
        IconSource,
        VKontakteSource,
        InstagramSource,
        TwitterSource,
        GoogleSource,
    ]
});

export default
class TypeTest extends Component {

    render() {
        return (
            <div>
                <Avatar />
                <CustomAvatar />

                <ConfigProvider>
                    <Avatar />
                </ConfigProvider>
            </div>
        )
    }
}
