'use strict';

import React from 'react';
import gravatarSource from './sources/Gravatar';
import facebookSource from './sources/Facebook';
import googleSource from './sources/Google';
import skypeSource from './sources/Skype';
import valueSource from './sources/Value';
import srcSource from './sources/Src';
import iconSource from './sources/Icon';

const PROTOCOL = typeof window === 'undefined' ?
                    'https:' : window.location.protocol;
const SOURCES = [
    gravatarSource,
    facebookSource,
    googleSource,
    skypeSource,
    valueSource,
    srcSource,
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
        round: React.PropTypes.bool,
        size: React.PropTypes.number
    }

    static defaultProps = {
        fgColor: '#FFF',
        color: null,
        name: null,
        value: null,
        email: null,
        md5Email: null,
        facebookId: null,
        skypeId: null,
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
        /**
        * This component ignores changes in `this.props.src`, `this.props.name`, and
        * `this.props.value`. This lifecycle method will allow users to change the avatars name or
        * value.
        */
        if (newProps.src && newProps.src !== this.props.src) {
            this.setState({ src: newProps.src });
        } else if (newProps.name && newProps.name !== this.props.name) {
            this.setState({ value: this.getInitials(newProps.name) });
        } else if (newProps.value && newProps.value !== this.props.value) {
            this.setState({ value: newProps.value });
        }
    }

    static gravatarURLTemplate = 'gravatar.com/avatar/<%=id%>?s=<%=size%>&d=404'
    static facebookURLTemplate = 'graph.facebook.com/<%=id%>/picture?width=<%=size%>'
    static googleURLTemplate = 'picasaweb.google.com/data/entry/api/user/<%=id%>?alt=json'
    static skypeURLTemplate = 'api.skype.com/users/<%=id%>/profile/avatar'

    getFacebookURL = (callback) =>
    {
        const parsedURL = this.parse(Avatar.facebookURLTemplate, {
            id: this.props.facebookId,
            size: this.props.size
        });
        callback(`${PROTOCOL}//${parsedURL}`);
    }

    getGoogleURL = ( id, size, cb, tryNext ) =>
    {
        const parsedURL = this.parse(Avatar.googleURLTemplate, {id: id});
        const url = `${PROTOCOL}//${parsedURL}`;

        this.get(url, function(data) {
            const src = data.entry.gphoto$thumbnail.$t;
            const srcWithCorrectSize = src.replace('s64', 's' + size);
            cb(srcWithCorrectSize);
        }, tryNext);
    }

    getSkypeURL = ( id, size, cb ) =>
    {
        const parsedURL = this.parse(Avatar.skypeURLTemplate, {id: id});
        cb(`${PROTOCOL}//${parsedURL}`);
    }

    parse( value, variables )
    {
        for(const variable in variables) {
            const variableValue = variables[variable];
            value = value.replace('<%=' + variable + '%>', variableValue);
        }
        return value;
    }

    setSrc = ( src ) => {
        if(src)
            this.setState({src: src});
    }

    tryNextsource = (Source) => {

        const instance = new Source(this.props);

        if(!instance.isCompatible(this.props)) {
            console.error('Source function "%s" not found', Source.name);
            this.fetch();
            return;
        }

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
        // then set state src back to null so getVisual will
        // automatically switch to drawn avatar if there is no other social ID available to try
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

        // if( this.state.triedFacebook === false && ! this.state.url && this.props.facebookId) {
            // this.state.triedFacebook = true;
            // this.getFacebookURL( this.props.facebookId , this.props.size, this.setSrc, tryNext );
            // return;
        // }

        // if( this.state.triedGoogle === false && ! this.state.url && this.props.googleId) {
            // this.state.triedGoogle = true;
            // this.getGoogleURL( this.props.googleId , this.props.size, this.setSrc, tryNext );
            // return;
        // }

        // if( this.state.triedSkype === false && ! this.state.url && this.props.skypeId) {
            // this.state.triedSkype = true;
            // this.getSkypeURL( this.props.skypeId , this.props.size, this.setSrc, tryNext );
            // return;
        // }

        // if( this.state.triedGravatar === false && ! this.state.url && this.props.email) {
            // this.state.triedGravatar = true;
            // this.getGravatarURL( this.props.email, this.props.size, this.setSrc, tryNext );
            // return;
        // }

        // if( this.state.src )
            // return;

        // if( this.props.name )
            // this.setState({ value: this.getInitials( this.props.name ) });

        // if( !this.props.name && this.props.value )
            // this.setState({ value: this.props.value });

        // if( url === null && this.props.src) {
            // const parsedURL = this.parse(this.props.src, {
                // size: this.props.size
            // });
            // this.setSrc(parsedURL);
        // }
    }

    getVisual() {
        const size = this.props.size;
        const round = this.props.round;
        const imageStyle = {
            maxWidth: '100%',
            width: size,
            height: size,
            borderRadius: (round ? 500 : 0)
        };

        const initialsStyle = {
            background: this.state.color,
            width: size,
            height: size,
            font: Math.floor(size / 3) + 'px/100px Helvetica, Arial, sans-serif',
            color: this.props.fgColor,
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: (size + Math.floor(size / 10)) + 'px',
            borderRadius: (round ? 500 : 0)
        };

        if(this.state.src ) {
            return (
                <img width={this.props.size}
                    height={this.props.size}
                    style={imageStyle}
                    src={this.state.src}
                    onError={this.fetch} />
            );
        } else {
            return (
                <div style={initialsStyle}>
                    {this.state.value}
                </div>
            );
        }
    }

    render() {
        const size = this.props.size;
        const hostStyle = {
            display: 'inline-block',
            width: size,
            height: size,
            borderRadius: (this.props.round ? 500 : 0)
        };
        const visual = this.getVisual();
        return (
            <div className={this.props.className}
                style={hostStyle}>
                {visual}
            </div>
        );
    }
}
