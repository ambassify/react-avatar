'use strict';

import createAvatarComponent from './avatar';
import gravatarSource from './sources/Gravatar';
import facebookSource from './sources/Facebook';
import twitterSource from './sources/Twitter';
import googleSource from './sources/Google';
import githubSource from './sources/Github';
import skypeSource from './sources/Skype';
import valueSource from './sources/Value';
import srcSource from './sources/Src';
import iconSource from './sources/Icon';
import redirectSource from './sources/AvatarRedirect';

const SOURCES = [
    facebookSource,
    googleSource,
    githubSource,
    twitterSource,
    redirectSource('twitter', 'twitterHandle'),
    redirectSource('instagram', 'instagramId'),
    redirectSource('vkontakte', 'vkontakteId'),
    skypeSource,
    gravatarSource,
    srcSource,
    valueSource,
    iconSource
];

export * from './avatar';
export { default as createAvatarComponent } from './avatar';

export default createAvatarComponent({
    sources: SOURCES
});

export { default as GravatarSource } from './sources/Gravatar';
export { default as FacebookSource } from './sources/Facebook';
export { default as TwitterSource } from './sources/Twitter';
export { default as GoogleSource } from './sources/Google';
export { default as GithubSource } from './sources/Github';
export { default as SkypeSource } from './sources/Skype';
export { default as ValueSource } from './sources/Value';
export { default as SrcSource } from './sources/Src';
export { default as IconSource } from './sources/Icon';
export { default as RedirectSource } from './sources/AvatarRedirect';
