
export const SOURCE_TYPES = {
    FACEBOOK: 'FACEBOOK',
    GITHUB: 'GITHUB',
    GOOGLE: 'GOOGLE',
    GRAVATAR: 'GRAVATAR',
    ICON: 'ICON',
    SKYPE: 'SKYPE',
    TWITTER: 'TWITTER',
    SRC: 'SRC',
    INSTAGRAM: 'INSTAGRAM',
    VKONTAKTE: 'VKONTAKTE'
};

// maps the source attribute required by a source to fetch its data
export const SOURCE_TYPE_SRC_MAPPING = {
    [SOURCE_TYPES.FACEBOOK]: 'facebookId',
    [SOURCE_TYPES.GITHUB]: 'githubHandle',
    [SOURCE_TYPES.GOOGLE]: 'googleId',
    [SOURCE_TYPES.GRAVATAR]: 'email',
    [SOURCE_TYPES.SKYPE]: 'skypeId',
    [SOURCE_TYPES.ICON]: 'icon',
    [SOURCE_TYPES.SRC]: 'src',
    [SOURCE_TYPES.INSTAGRAM]: 'instagramId',
    [SOURCE_TYPES.VKONTAKTE]: 'vkontakteId'
};
