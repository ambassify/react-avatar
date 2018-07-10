import * as React from "react";

export interface ReactAvatarProps {
    className?: string;
    email?: string;
    md5Email?: string;
    facebookId?: string;
    twitterHandle?: string;
    googleId?: string;
    skypeId?: string;
    name?: string;
    maxInitials?: number;
    value?: string;
    color?: string;
    fgColor?: string;
    size?: string;
    textSizeRatio?: number;
    round?: boolean | string;
    src?: string;
    style?: any;
    unstyled?: boolean;
    onClick?: (e: React.SyntheticEvent<any>) => any;
}

export interface ConfigProvider {
    colors?: string[];
    cache?: Cache;
}

export interface Cache {
    set: (key: string, value: string) => void;
    get: (key: string) => string | null;
    sourceFailed: (source: string) => void;
    hasSourceFailedBefore: (source: string) => boolean;
}

declare const ReactAvatar: React.ComponentType<ReactAvatarProps>;

export default ReactAvatar;
