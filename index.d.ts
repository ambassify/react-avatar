import * as React from "react";


export interface ReactAvatarProps {
    /**
     * Name of the CSS class you want to add to this component alongside the default sb-avatar.
     */
    className?: string;
    /**
     * String of the email address of the user.
     */
    email?: string;
    /**
     * String of the MD5 hash of email address of the user.
     */
    md5Email?: string;
    facebookId?: string;
    twitterHandle?: string;
    googleId?: string;
    githubHandle?: string;
    skypeId?: string;
    /**
     * Will be used to generate avatar based on the initials of the person
     */
    name?: string;
    /**
     * Set max nr of characters used for the initials. If maxInitials=2 and the name is Foo Bar Var the initials will be FB
     */
    maxInitials?: number;
    /**
     * Initials to show or a method converting name into initials
     * @param {string} name
     * @param {any} value
     * @returns {string}
     */
    initials?: string | ((name: string, props: any) => string);
    /**
     * Show a value as avatar
     */
    value?: string;
    /**
     * The alt attribute used on the avatar img tag. If not set we will fallback to either name or value
     */
    alt?: string;
    /**
     * Used in combination with `name` and `value`. Give the background a fixed color with a hex like for example #FF0000
     */
    color?: string;
    /**
     * Used in combination with `name` and `value`. Give the text a fixed color with a hex like for example #FF0000
     */
    fgColor?: string;
    /**
     * 	Size of the avatar
     */
    size?: string;
    /**
     * For text based avatars the size of the text as a fragment of size (size / textSizeRatio)
     */
    textSizeRatio?: number;
    /**
     * For text based avatars. The size of the minimum margin between the text and the avatar's edge, used to make sure the text will always fit inside the avatar. (calculated as `size * textMarginRatio`)
     */
    textMarginRatio?: number;
    /**
     * The amount of `border-radius` to apply to the avatar corners, `true` shows the avatar in a circle.
     */
    round?: boolean | string;
    /**
     * Fallback image to use
     */
    src?: string;
    /**
     * Style that will be applied on the root element
     */
    style?: any;
    /**
     * Disable all styles
     */
    unstyled?: boolean;
    /**
     * Mouse click event
     * @param {React.SyntheticEvent<any>} e
     * @returns {any}
     */
    onClick?: (e: React.SyntheticEvent<any>) => any;
}

export interface ConfigProvider {
    /**
     * A list of color values as strings from which the getRandomColor picks one at random.
     */
    colors?: string[];
    /**
     * Cache implementation used to track broken img URLs
     */
    cache?: Cache;
    /**
     * Method converting name into initials
     * @param {string} name
     * @param {any} value
     * @returns {string}
     */
    initials?: (name: string, props: any) => string;
    /**
     * The baseUrl for a avatar-redirect service
     */
    avatarRedirectUrl?: string;
}

export interface Cache {
    /**
     * Save `value` at `key`, such that it can be retrieved using `get(key)`
     * @param {string} key
     * @param {string} value
     */
    set: (key: string, value: string) => void;
    /**
     * Retrieve the value stored at `key`, if the cache does not contain a value for `key` return `null`
     * @param {string} key
     * @returns {string | null}
     */
    get: (key: string) => string | null;
    /**
     * Mark the image URL specified in `source` as failed.
     * @param {string} source
     */
    sourceFailed: (source: string) => void;
    /**
     * Returns `true` if the `source` has been tagged as failed using `sourceFailed(source)`, otherwise `false`.
     * @param {string} source
     * @returns {boolean}
     */
    hasSourceFailedBefore: (source: string) => boolean;
}

/**
 * Universal avatar makes it possible to fetch/generate an avatar based on the information you have about that user.
 * We use a fallback system that if for example an invalid Facebook ID is used it will try Google, and so on.
 */
declare const ReactAvatar: React.ComponentType<ReactAvatarProps>;

export const ConfigProvider: React.ComponentType<ConfigProvider>;
export default ReactAvatar;
