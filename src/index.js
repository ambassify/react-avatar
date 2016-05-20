'use strict';

import React from 'react';

import gravatarSource from './sources/Gravatar.js';
import facebookSource from './sources/Facebook.js';
import twitterSource from './sources/Twitter.js';
import googleSource from './sources/Google.js';
import skypeSource from './sources/Skype.js';
import valueSource from './sources/Value.js';
import srcSource from './sources/Src.js';
import iconSource from './sources/Icon.js';

const SOURCES = [
    gravatarSource,
    facebookSource,
    twitterSource,
    googleSource,
    skypeSource,
    srcSource,
    valueSource,
    iconSource
];

export default class Avatar extends React.Component {
    static displayName = 'Avatar'
    static propTypes = {
        className: React.PropTypes.string,
        fgColor: React.PropTypes.string,
        color: React.PropTypes.string,
        colors: React.PropTypes.array,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        email: React.PropTypes.string,
        md5Email: React.PropTypes.string,
        src: React.PropTypes.string,
        facebookId: React.PropTypes.string,
        googleId: React.PropTypes.string,
        skypeId: React.PropTypes.string,
        twitterHandle: React.PropTypes.string,
        round: React.PropTypes.bool,
        size: React.PropTypes.number
    }

    static defaultProps = {
        className: 'sb-avatar',
        fgColor: '#FFF',
        color: null,
        name: null,
        value: null,
        email: null,
        md5Email: null,
        facebookId: null,
        skypeId: null,
        twitterHandle: null,
        googleId: null,
        round: false,
        size: 100
    }

    constructor(props) {
        super(props);
        this.state = {
            sourcePointer: 0,
            src: null,
            value: null,
            color: props.color
        };
    }

    componentWillMount() {
        this.fetch();
    }

    componentWillReceiveProps(newProps) {
        const nextState = {};
        if (newProps.src !== this.props.src)
            nextState.src = newProps.src;

        if (newProps.name !== this.props.name)
            nextState.name = newProps.name;

        if (newProps.value !== this.props.value)
            nextState.value = newProps.value;

        if (newProps.skypeId !== this.props.skypeId)
            nextState.skypeId = newProps.skypeId;

        if (newProps.email !== this.props.email)
            nextState.email = newProps.email;

        if (newProps.md5Email !== this.props.md5Email)
            nextState.md5Email = newProps.md5Email;

        if (newProps.facebookId !== this.props.facebookId)
            nextState.facebookId = newProps.facebookId;

        if (newProps.googleId !== this.props.googleId)
            nextState.googleId = newProps.googleId;

        if (newProps.twitterHandle !== this.props.twitterHandle)
            nextState.twitterHandle = newProps.twitterHandle;

        if(Object.keys(nextState) !== 0) {
            nextState.sourcePointer = 0;
            this.setState(nextState, this.fetch);
        }
    }

    tryNextsource = (Source) => {

        const instance = new Source(this.props);

        if(!instance.isCompatible(this.props))
            return this.fetch();

        instance.get((state) => {
            if(state) {
                this.setState(state);
                return;
            } else {
                this.fetch();
            }
        });
    }

    fetch = (event) => {

        // If fetch was triggered by img onError
        // then set state src back to null so render will
        // automatically switch a text avatar if there is no
        // other social ID available to try
        if( event && event.type === 'error' )
            this.setState({src: null});

        if(SOURCES.length === this.state.sourcePointer)
            return;

        const source = SOURCES[this.state.sourcePointer];
        this.setState({
            sourcePointer: (this.state.sourcePointer + 1)
        }, () => {
            this.tryNextsource(source);
        });
    }

    _renderAsImage() {
        const size = this.props.size;
        const round = this.props.round;
        const alt = this.props.name || this.props.value;
        const imageStyle = {
            maxWidth: '100%',
            width: size,
            height: size,
            borderRadius: (round ? 500 : 0)
        };
        return (
            <img width={this.props.size}
                height={this.props.size}
                style={imageStyle}
                src={this.state.src}
                alt={alt}
                onError={this.fetch} />
        );
    }

    _renderAsText() {
        const size = this.props.size;
        const round = this.props.round;
        const initialsStyle = {
            width: size,
            height: size,
            font: Math.floor(size / 3) + 'px Helvetica, Arial, sans-serif',
            lineHeight: size + 'px', // yes, px suffix is needed on lineHeight
            textAlign: 'center',
            textTransform: 'uppercase',
            color: this.props.fgColor,
            background: this.state.color,
            borderRadius: (round ? '100%' : 0)
        };
        return (
            <div style={initialsStyle}>
                {this.state.value}
            </div>
        );
    }

    render() {
        const size = this.props.size;
        const hostStyle = {
            display: 'inline-block',
            width: size,
            height: size,
            borderRadius: (this.props.round ? 500 : 0)
        };
        return (
            <div className={this.props.className}
                style={hostStyle}>
                {this.state.src ? this._renderAsImage() : this._renderAsText()}
            </div>
        );
    }
}
