
module.exports = (function() {

  "use strict";

  var React = require('react');
  var md5 = require('MD5');

  var Avatar = React.createClass({displayName: "Avatar",

    getProtocol: function()
    {
      if( typeof window === 'undefined' )
        return 'https:';

      return window.location.protocol;
    },

    /**
     * Gravatar implementation
     * @param  {string}   email MD5 hash or plain text email address
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getGravatarURL: function(email, size, cb, tryNext )
    {
      var base = 'gravatar.com/avatar/<%=id%>?s=<%=size%>';

      // if email does not contain @ it's already an MD5 hash
      if( email.indexOf('@') > -1 )
        email = md5(email);

      var prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
      cb(prefix + this.parse(base, {id: email, size: size}));
    },

    /**
     * Facebook implementation
     * @param  {string|int}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getFacebookURL: function( id, size, cb, tryNext )
    {
      var base = 'graph.facebook.com/<%=id%>/picture?width=<%=size%>';
      cb( this.getProtocol() + '//' + this.parse(base, {id: id, size: size}));
    },

    /**
     * Google+ implementation
     * @param  {int}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getGoogleURL: function( id, size, cb, tryNext )
    {
      var base = 'picasaweb.google.com/data/entry/api/user/<%=id%>?alt=json';
      var url = this.getProtocol() + '//' + this.parse(base, {id: id});
      this.get(url, function(data) {
        var src = data.entry.gphoto$thumbnail.$t.replace('s64', 's' + size); // replace with the correct size
        cb(src);
      }, tryNext);
    },

    /**
     * Skype implementation
     * @param  {string}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getSkypeURL: function( id, size, cb, tryNext )
    {
      var base = 'api.skype.com/users/<%=id%>/profile/avatar';
      cb(this.getProtocol() + '//' + this.parse(base, {id: id}));
    },

    /**
     * Replace variables in a string
     * @param  {string} value String that will be parsed
     * @param  {Object} variables    Key value object
     * @return {string}
     */
    parse: function( value, variables )
    {
      for(var variable in variables)
      {
        value = value.replace('<%=' + variable + '%>', variables[variable]);
      }
      return value;
    },

    /**
     * Return a random color
     * @return {string}
     */
    rndColor: function()
    {
      var colors = ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'];
      var index = Math.floor(Math.random()*colors.length);
      return colors[ index ];
    },

    /**
     * Convert a name into initials
     * @param {string} name
     * @return {string}
     */
    getInitials: function( name )
    {
      var parts = name.split(' ');
      var initials = '';
      for(var i=0 ; i < parts.length ; i++)
      {
        initials += parts[i].substr(0, 1).toUpperCase();
      }
      return initials;
    },

    /**
     * Do an ajax request to fetch remote data
     * @param  {string}   url
     * @param  {Function} cb
     * @return {void}
     */
    get: function(url, successCb, errorCb) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            successCb(data);
          } else {
            errorCb(request.status);
          }
        }
      };
      request.open('GET', url, true);
      request.send();
    },

    /**
     * Set the src attribute of the image element use to display the avatar
     * @param {string} src
     */
    setSrc: function( src )
    {
      if( src === null )
        return;

      this.setState({ src: src });
    },

    propTypes: {
      color: React.PropTypes.string,
      name: React.PropTypes.string,
      value: React.PropTypes.string,
      email: React.PropTypes.string,
      facebookId: React.PropTypes.string,
      googleId: React.PropTypes.string,
      skypeID: React.PropTypes.string,
      round: React.PropTypes.bool,
      size: React.PropTypes.number
    },
    getInitialState: function() {
      return {
        src: null,
        value: null,
        triedFacebook: false,
        triedGoogle: false,
        triedSkype: false,
        triedGravatar: false,
      };
    },
    getDefaultProps: function() {
      return {
        color: null,
        name: null,
        value: null,
        email: null,
        facebookId: null,
        skypeId: null,
        googleId: null,
        round: false,
        size: 100
      };
    },
    componentWillMount: function() {
      this.fetch();
    },
    componentWillReceiveProps: function(newProps) {
      /**
       * This component ignores changes in `this.props.src`, `this.props.name`, and
       * `this.props.value`. This lifecycle method will allow users to change the avatars name or
       * value.
       */
      if (this.props.src && newProps.src !== this.props.src) {
        this.setState({ src: newProps.src });
      } else if (newProps.name && newProps.name !== this.props.name) {
        this.setState({ value: this.getInitials(newProps.name) });
      } else if (newProps.value && newProps.value !== this.props.value) {
        this.setState({ value: newProps.value });
      }
    },
    fetch: function( e ) {
      var url = null;
      var self = this;
      var tryNext = function() {
        self.fetch();
      };

      // If fetch was triggered by img onError
      // then set state src back to null so getVisual will
      // automatically switch to drawn avatar if there is no other social ID available to try
      if( e && e.type === "error" )
        this.state.src = null;

      if( this.state.triedFacebook === false && ! this.state.url && this.props.facebookId) {
        this.state.triedFacebook = true;
        this.getFacebookURL( this.props.facebookId , this.props.size, this.setSrc.bind(this), tryNext );
        return;
      }

      if( this.state.triedGoogle === false && ! this.state.url && this.props.googleId) {
        this.state.triedGoogle = true;
        this.getGoogleURL( this.props.googleId , this.props.size, this.setSrc.bind(this), tryNext );
        return;
      }

      if( this.state.triedSkype === false && ! this.state.url && this.props.skypeId) {
        this.state.triedSkype = true;
        this.getSkypeURL( this.props.skypeId , this.props.size, this.setSrc.bind(this), tryNext );
        return;
      }

      if( this.state.triedGravatar === false && ! this.state.url && this.props.email) {
        this.state.triedGravatar = true;
        this.getGravatarURL( this.props.email, this.props.size, this.setSrc.bind(this), tryNext );
        return;
      }

      if( this.state.src )
        return;

      if( this.props.name )
        this.setState({ value: this.getInitials( this.props.name ) });

      if( !this.props.name && this.props.value )
        this.setState({ value: this.props.value });

      if( url === null && this.props.src) {
        this.setSrc( this.parse(this.props.src, {size: this.props.size}) );
        return;
      }
    },
    getVisual: function() {

      var imageStyle = {
        maxWidth: '100%',
        width: this.props.size,
        height: this.props.size,
        borderRadius: (this.props.round ? 500 : 0)
      };

      var initialsStyle = {
        background: this.props.color || this.rndColor(),
        width: this.props.size,
        height: this.props.size,
        font: Math.floor(this.props.size/3) + 'px/100px Helvetica, Arial, sans-serif',
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        lineHeight: (this.props.size + Math.floor(this.props.size/10)) + 'px',
        borderRadius: (this.props.round ? 500 : 0)
      };

      if(this.state.src ) {
        return (
          /* jshint ignore:start */
          React.createElement("img", {width:  this.props.size, height:  this.props.size, style: imageStyle, src:  this.state.src, onError:  this.fetch})
          /* jshint ignore:end */
        );
      } else {
        return (
          /* jshint ignore:start */
          React.createElement("div", {style: initialsStyle },  this.state.value)
          /* jshint ignore:end */
        );
      }
    },
    render: function() {

      var hostStyle = {
        display: 'inline-block',
        width: this.props.size,
        height: this.props.size,
        borderRadius: (this.props.round ? 500 : 0)
      };
      var visual = this.getVisual();

      return (
        /* jshint ignore:start */
        React.createElement("div", {style: hostStyle }, 
          visual 
        )
        /* jshint ignore:end */
      );
    }
  });

  return Avatar;

})();
