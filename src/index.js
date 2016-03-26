'use strict';

import React from 'react';
import gravatarSource from './sources/Gravatar';
import facebookSource from './sources/Facebook';
import googleSource from './sources/Google';
import skypeSource from './sources/Skype';
import valueSource from './sources/Value';
import srcSource from './sources/Src';
import iconSource from './sources/Icon';

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
