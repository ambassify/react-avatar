'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Avatar, {getRandomColor, ConfigProvider} from './../src';

import './index.html';
import './demo.css';
import './favicon.png';

const customColors = [
    '#5E005E',
    '#AB2F52',
    '#E55D4A',
    '#E88554',
    '#4194A6',
    '#82CCD9',
    '#FFCC6B',
    '#F2855C',
    '#7D323B'
];

export default
class Demo extends React.Component {
    static displayName = 'Demo';

    state = {
        name: 'Wim Mostmans',
        skypeId: null,
        toggle: true,
        color: customColors[0]
    }

    _onToggleName = () => {
        this.setState({
            name: 'Foo Bar',
            skypeId: null
        });
    }

    _onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    _onSetSkype = () => {
        this.setState({skypeId: 'sitebase'});
    }

    _onClick = () => {
        alert('Clicked!');
    }

    _onToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    _onToggleColor = () => {
        const current = customColors.indexOf(this.state.color);
        const next = (current + 1) % customColors.length;

        this.setState({ color: customColors[next] });
    }

    render() {
        return (
            <div>
                <section>
                    <h2>Configure</h2>
                    <p>Set a name to use in the examples below.</p>
                    <label style={{ display: 'block' }}>
                        <span>Name:</span>&nbsp;
                        <input type="text"
                            value={this.state.name}
                            onChange={this._onChangeName} />
                    </label>
                </section>
                <section>
                    <h2>Gravatar</h2>
                    <Avatar className="myCustomClass" md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={40} />
                    <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={100} round={true} />
                    <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={150} round="20px" />
                    <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={200} />
                </section>

                <section>
                    <h2>Invalid gravatar</h2>
                    <Avatar email="bla" name="Jim Jones" size={80} />
                    <Avatar email="foo" name="Jamie Jones" size={80} />
                    <Avatar name="Jessica Jones" size={80} />
                    <Avatar name="Jeronimo Jones" size={80} />
                </section>

                <section>
                    <h2>Initials Text Size</h2>
                    <Avatar name={this.state.name} size={80} />
                    <Avatar name="Wim Mostmans" size={80} />
                    <Avatar name="Jeronimo Jones" size={80} />
                    <Avatar name="Wim Test Mostmans" size={80} />
                </section>

                <section>
                    <h2>Google+</h2>
                    <Avatar googleId="116933859726289749306" size={40} />
                    <Avatar googleId="116933859726289749306" size={100} round={true} />
                    <Avatar googleId="116933859726289749306" size={150} round="20px" />
                    <Avatar googleId="116933859726289749306" size={200} />
                </section>

                <section>
                    <h2>Facebook</h2>
                    <Avatar facebookId="100008343750912" size={40} />
                    <Avatar facebookId="100008343750912" size={100} round={true} />
                    <Avatar facebookId="100008343750912" size={150} round="20px" />
                    <Avatar facebookId="100008343750912" size={200} />
                </section>

                <ConfigProvider avatarRedirectUrl="https://avatar-redirect.appspot.com">
                    <section>
                        <h2>Twitter using Avatar Redirect</h2>
                        <Avatar twitterHandle="sitebase" size={40} />
                        <Avatar twitterHandle="sitebase" size={100} round={true} />
                        <Avatar twitterHandle="sitebase" size={150} round="20px" />
                        <Avatar twitterHandle="sitebase" size={200} />
                    </section>
                </ConfigProvider>

                <ConfigProvider avatarRedirectUrl="https://avatar-redirect.appspot.com">
                    <section>
                        <h2>Instagram using Avatar Redirect</h2>
                        <Avatar instagramId="sitebase" size={40} />
                        <Avatar instagramId="sitebase" size={100} round={true} />
                        <Avatar instagramId="sitebase" size={150} round="20px" />
                        <Avatar instagramId="sitebase" size={200} />
                    </section>
                </ConfigProvider>

                <section>
                    <h2>Vkontakte</h2>
                    <Avatar vkontakteId="1" size={40} />
                    <Avatar vkontakteId="1" size={100} round={true} />
                    <Avatar vkontakteId="1" size={150} round="20px" />
                    <Avatar vkontakteId="1" size={200} />
                </section>

                <section>
                    <h2>Skype</h2>
                    <Avatar skypeId="sitebase" size={40} />
                    <Avatar skypeId="sitebase" size={100} round={true} />
                    <Avatar skypeId="sitebase" size={150} round="20px" />
                    <Avatar skypeId="sitebase" size={200} />
                </section>

                <section>
                    <h2>Initials</h2>
                    <div>
                        <button onClick={this._onToggleName}>Change name</button>
                        <button onClick={this._onSetSkype}>Set skype ID</button>
                    </div>
                    <Avatar name={this.state.name} skypeId={this.state.skypeId} size={40} />
                    <Avatar name={this.state.name} size={100} round={true}/>
                    <Avatar name={this.state.name} size={150} round="20px" />
                    <Avatar name={this.state.name} size={200} />
                </section>

                <section>
                    <h2>onClick</h2>
                    <Avatar name={this.state.name} onClick={this._onClick} size={200} />
                </section>

                <section>
                    <h2>Initials with different font sizes</h2>
                    <div>
                        <Avatar name={this.state.name} skypeId={this.state.skypeId} size={40} textSizeRatio={2} />
                        <Avatar name={this.state.name} size={100} round={true} textSizeRatio={2} />
                        <Avatar name={this.state.name} size={150} round="20px" textSizeRatio={2} />
                        <Avatar name={this.state.name} size={200} textSizeRatio={2} />
                    </div>
                    <div>
                        <Avatar name={this.state.name} skypeId={this.state.skypeId} size={40} textSizeRatio={4} />
                        <Avatar name={this.state.name} size={100} round={true} textSizeRatio={4} />
                        <Avatar name={this.state.name} size={150} round="20px" textSizeRatio={4} />
                        <Avatar name={this.state.name} size={200} textSizeRatio={4} />
                    </div>
                </section>

                <section>
                    <h2>Size in different units</h2>
                    <div>
                        <Avatar value="30pt" skypeId={this.state.skypeId} size="30pt" textSizeRatio={4} />
                        <Avatar value="90pt" size="90pt" round={true} textSizeRatio={4} />
                        <Avatar value="130pt" size="130pt" round="20px" textSizeRatio={4} />
                        <Avatar value="170pt" size="170pt" textSizeRatio={4} />
                    </div>
                    <div>
                        <Avatar value="4vw" skypeId={this.state.skypeId} size="4vw" textSizeRatio={4} />
                        <Avatar value="6vw" size="6vw" round={true} textSizeRatio={4} />
                        <Avatar value="10vw" size="10vw" round="20px" textSizeRatio={4} />
                        <Avatar value="15vw" size="15vw" textSizeRatio={4} />
                    </div>
                    <div style={{ overflow: 'hidden', margin: '0 auto', width: '800px', textAlign: 'center' }}>
                        <div style={{ width: '200px', height: '200px', float: 'left' }}>
                            <Avatar value="30%" skypeId={this.state.skypeId} size="30%" />
                        </div>
                        <div style={{ width: '200px', height: '200px', float: 'left' }}>
                            <Avatar value="45%" size="45%" round={true} />
                        </div>
                        <div style={{ width: '200px', height: '200px', float: 'left' }}>
                            <Avatar value="60%" size="60%" round="20px" />
                        </div>
                        <div style={{ width: '200px', height: '200px', float: 'left' }}>
                            <Avatar value="100%" size="100%" />
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Custom colors</h2>
                    <div>
                        <Avatar name={this.state.name} color={getRandomColor('Jim Jones', customColors)} size={40} />
                        <Avatar name={this.state.name} color={getRandomColor('Jamie Jones', customColors)} size={100} round={true} />
                        <Avatar name={this.state.name} color={getRandomColor('JJ', customColors)} size={150} round="20px" />
                        <Avatar name={this.state.name} color={getRandomColor(this.state.name, customColors)} size={200} />
                    </div>
                </section>

                <section>
                    <h2>Initials with maximum number of characters</h2>
                    <div>
                        <Avatar name={this.state.name} maxInitials={2} skypeId={this.state.skypeId}
                            size={40} textSizeRatio={2} />
                        <Avatar name={this.state.name} maxInitials={1} size={100} round={true}
                            textSizeRatio={2} />
                        <Avatar name={this.state.name} size={150} round="20px" textSizeRatio={2} />
                        <Avatar name={this.state.name} size={200} textSizeRatio={2} />
                    </div>
                </section>

                <section>
                    <h2>Value</h2>
                    <Avatar value="86%" size={40} />
                    <Avatar value="86%" size={100} round={true} />
                    <Avatar value="86%" size={150} round="20px" />
                    <Avatar value="86%" size={200} />
                </section>

                <section>
                    <h2>Fallback to static src</h2>
                    <Avatar size={150} facebookId="invalidfacebookusername" src="https://thumbs.dreamstime.com/m/cute-monster-avatar-smiling-face-yellow-color-52010608.jpg" name="Foo Bar" />
                </section>

                <section>
                    <h2>Double fallback: Facebook to Google to initials</h2>
                    <Avatar facebookId="invalidfacebookusername"
                        googleId="invalidgoogleid"
                        name="Sitebase"
                        size={200}
                        round={true} />
                </section>
                <section>
                    <h2>Custom style</h2>
                    <Avatar
                        name="Wim Mostmans"
                        style={{borderRadius: 10, border: 'solid 10px rgba(0,0,0,0.5)'}}
                        size={100} />
                </section>
                <section>
                    <h2>Unstyled</h2>
                    <Avatar
                        name="Wim Mostmans"
                        unstyled={true} />
                </section>
                <section>
                    <h2>Vertical Alignment</h2>
                    <Avatar name="Wim Mostmans" size={50} />
                    Wim Mostmans
                    <Avatar name="Wim Mostmans" size={50} round={true} />
                    Wim Mostmans
                    <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={50} round={true} />
                    Wim Mostmans
                    <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={150} />
                    Wim Mostmans
                </section>
                <section>
                    <h2>Toggle with cached Avatars</h2>
                    <div>
                        <button onClick={this._onToggle}>Click to toggle</button>
                    </div>
                    {this.state.toggle &&
                        <div>
                            <Avatar name="Wim Mostmans" size={50} />
                            <Avatar name="Wim Mostmans" size={50} round={true} />
                            <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={50} round={true} />
                            <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={150} />
                        </div>
                    }
                </section>
                <section>
                    <h2>Toggle color</h2>
                    <div>
                        <button onClick={this._onToggleColor}>Click to toggle</button>
                    </div>
                    <div>
                        {this.state.color}
                    </div>
                    <div>
                        <Avatar name="Wim Mostmans" size={50} color={this.state.color} />
                        <Avatar name="Wim Mostmans" size={50} round={true} color={this.state.color} />
                        <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={50} round={true} color={this.state.color} />
                        <Avatar md5Email="8c5d4c4b9ef6c68c4ff91c319d4c56be" size={150} color={this.state.color} />
                    </div>
                </section>

                <ConfigProvider colors={customColors}>
                    <section>
                        <h2>Configuration Context</h2>
                        <div>
                            <Avatar name="Jim Jones" size={40} />
                            <Avatar name="Jamie Jones" size={100} round={true} />
                            <Avatar name="JJ" size={150} round="20px" />
                            <Avatar name={this.state.name} size={200} />
                        </div>
                    </section>
                </ConfigProvider>

                <ConfigProvider initials={name => name.split(/\s+/)[0]}>
                    <section>
                        <h2>Custom Initials Function</h2>
                        <div>
                            <Avatar name="Jim Jones" size={40} />
                            <Avatar name="Jamie Jones" size={100} round={true} />
                            <Avatar name="JJ" size={150} round="20px" />
                            <Avatar name={this.state.name} size={200} />
                        </div>
                    </section>
                </ConfigProvider>

            </div>
        );
    }
}

var mountNode = document.getElementById('container');
ReactDOM.render(<Demo />, mountNode);
